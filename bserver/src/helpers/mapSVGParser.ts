import { InternalServerErrorException } from '@nestjs/common';
import { Exception500 } from '../types/enums';
import { parse } from 'svg-parser';

enum Type {
  element = 'element',
}
enum TagName {
  g = 'g',
  svg = 'svg',
  text = 'text',
  path = 'path',
  circle = 'circle',
  metadata = 'metadata',
}

type SeatProperties = Partial<{
  component: 'sector' | 'row' | 'seat';
  sector: string | number;
  sectorName: string | number;
  rowName: string | number;
  name: string | number;
  multi: boolean;
  id: string | number;
}>;

type Properties = Partial<{
  id: string;
  version: 1.1;
  viewBox: string;
  width: number;
  height: number;
  'xml:space': 'preserve';
  xmlns: 'http://www.w3.org/2000/svg';
  'xmlns:xlink': 'http://www.w3.org/1999/xlink';
  x: string;
  y: string;
}>;

type XML = {
  type: Type;
  tagName: TagName;
  properties: Properties;
  children: XML[];
  metadata?: string;
};
type XMLSeat = {
  type: Type;
  tagName: TagName;
  properties: SeatProperties;
  children: XML[];
  metadata?: string;
};

export function mapSVGParser(buffer: Buffer, prev = null) {
  if (!buffer) {
    throw new InternalServerErrorException(Exception500.parseSVGError);
  }
  const xml = parse(buffer.toString())?.children as XML[];
  if (!xml) {
    throw new InternalServerErrorException(Exception500.parseSVGError);
  }

  const accumulator = prev ? prev : { background: [] };

  for (const data of xml) {
    const { properties, metadata } = data;
    // root document tagName=svg
    accumulator.attributes = properties;
    accumulator.xml = metadata;
    accumulator.width = properties.width;
    accumulator.height = properties.height;
    accumulator.viewBox = properties.viewBox;

    for (const elem of data.children) {
      const { tagName, properties, children } = elem;
      switch (tagName) {
        // svg metadata document
        case 'metadata':
          accumulator.metadata = elem;
          break;
        // map elements
        case 'g':
          switch (properties.id) {
            case 'background':
              accumulator.paths = children.map(({ tagName, properties }) => ({
                tagName,
                ...properties,
              }));
            // обрати внимание, здесь нет break; это правильно
            case 'details':
              accumulator.background.push(...children);
              break;

            case 'seats':
              accumulator.seats = children.flatMap(
                // sector props
                ({
                  children,
                  properties: { component, ...sectorProperties },
                }: XMLSeat) =>
                  children.flatMap(
                    // row props
                    ({
                      children,
                      properties: { component, ...rowProperties },
                    }: XMLSeat) =>
                      children.flatMap(
                        // seat props
                        ({ properties, tagName }: XMLSeat) => ({
                          ...sectorProperties,
                          ...rowProperties,
                          ...properties,
                          tagName,
                        }),
                      ),
                  ),
              );
              break;
          }
          break;
      }
    }

    return accumulator;
  }
}
