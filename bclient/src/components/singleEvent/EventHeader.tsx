import { Event, EventHeaderType } from '../../types/types';
import { Cities, HeaderType } from '../../types/enums';
import MainImage from './MainImage';
import React from 'react';

export type EventHeaderComponentProps = {
  city: Cities;
  date: string | undefined;
  club: { slug?: string; title?: string };
  categories: Event['categories'];
  visitorAge?: number;
} & EventHeaderType;

const EventHeader = (props: EventHeaderComponentProps) => {
  if (props.type === HeaderType.image) {
    return <MainImage {...props} />;
  }

  return null;
};

export default EventHeader;
