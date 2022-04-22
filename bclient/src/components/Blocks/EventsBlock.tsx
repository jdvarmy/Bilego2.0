import React, { useEffect, useState } from 'react';
import SkeletonEvents from '../Skeletons/SkeletonEvents';
import { Category, Event, Feeling, Genre, Selection } from '../../types/types';
import { SortType, Term } from '../../types/enums';

const count = 12 as const;

export type EventsBlockProps = {
  parameters: {
    pageNumber?: number;
    [Term.category]?: Category[];
    [Term.genre]?: Genre[];
    [Term.feeling]?: Feeling[];
    [Term.selection]?: Selection[];
    sort?: SortType;
  };
  events?: Event[];
};

const EventsBlock = ({ events }: EventsBlockProps) => {
  const [localEvents, setLocalEvents] = useState(events);

  useEffect(() => {
    if (!localEvents?.length) {
      console.log('get events');
    }
  }, [localEvents]);

  return (
    <div className='mt-6'>
      <SkeletonEvents />
    </div>
  );
};

export default EventsBlock;
