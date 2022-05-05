import React, { useState, ContextType, useEffect } from 'react';
import SkeletonEvents from '../../Skeletons/SkeletonEvents';
import { Event, ParametersType } from '../../../types/types';
import EventBox from '../components/EventBox';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import useDrag from '../../../hooks/useDrag';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { globalSelector } from '../../../store/selectors';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { asyncGetEventsBlock } from '../../../store/events/eventsThunk';
import { getEventsBlockClientSide } from '../../../store/events/eventsSlice';
import TitleBlock from '../components/TitleBlock';

export type EventsBlockProps = {
  title: string;
  events: Event[];
  parameters: ParametersType;
  isUseIntersection?: boolean;
};

const EventsBlock = ({ title, events, parameters, isUseIntersection = false }: EventsBlockProps) => {
  const dispatch = useDispatch();
  const { city } = useTypeSelector(globalSelector);
  const [localEvents, setLocalEvents] = useState<Event[] | null>(events ?? null);

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }: ContextType<typeof VisibilityContext>) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  useEffect(() => {
    if (!events || !events.length) {
      dispatch(getEventsBlockClientSide(setLocalEvents, { city, ...parameters }));
    }
  }, [events, city, parameters, dispatch]);

  return (
    <div className='mt-10 w-full'>
      {localEvents && localEvents.length ? (
        <>
          <TitleBlock title={title} />
          <div onMouseLeave={dragStop}>
            <ScrollMenu
              onWheel={onWheel}
              onMouseDown={() => dragStart}
              onMouseUp={() => dragStop}
              onMouseMove={handleDrag}
            >
              {localEvents.map((event) => (
                <EventBox
                  key={event.id}
                  city={city}
                  event={event}
                  dragging={dragging}
                  isLastItem={event.id === localEvents[localEvents.length - 1].id}
                  isUseIntersection={isUseIntersection}
                  setEvents={setLocalEvents}
                  requestParameters={{ ...parameters, city, offset: localEvents.length }}
                />
              ))}
            </ScrollMenu>
          </div>
        </>
      ) : (
        <SkeletonEvents />
      )}
    </div>
  );
};

export default EventsBlock;

function onWheel(apiObj: ContextType<typeof VisibilityContext>, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
