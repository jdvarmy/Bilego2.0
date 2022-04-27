import React, { useState, ContextType } from 'react';
import SkeletonEvents from '../Skeletons/SkeletonEvents';
import { Event, ParametersType } from '../../types/types';
import EventBox from './EventBox';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import useDrag from '../../hooks/useDrag';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { globalSelector } from '../../store/selectors';

export type EventsBlockProps = {
  events: Event[];
  parameters: ParametersType;
  isUseIntersection?: boolean;
};

const EventsBlock = ({ events, parameters, isUseIntersection = false }: EventsBlockProps) => {
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

  return (
    <div className='mt-6 w-full'>
      {localEvents && localEvents?.length ? (
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
