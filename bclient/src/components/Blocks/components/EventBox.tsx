import React, { useCallback, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Event, ParametersType } from '../../../types/types';
import css from '../Block.module.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getEventsBlockClientSide } from '../../../store/events/eventsSlice';
import { Cities } from '../../../types/enums';

type Props = {
  event: Event;
  city: Cities | null;
  dragging?: boolean;
  isLastItem?: boolean;
  isUseIntersection?: boolean;
  setEvents: Dispatch<SetStateAction<Event[] | null>>;
  requestParameters?: ParametersType;
};

const EventBox = ({
  event: { image, title, slug, dates },
  city,
  dragging,
  isLastItem,
  isUseIntersection,
  setEvents,
  requestParameters,
}: Props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const date = dates?.dateFrom.split(' ')[0];
  const startDate = date ? new Date(date) : undefined;

  const handleRouter = useCallback(
    (href: string) => async () => {
      if (dragging) {
        return false;
      }
      await router.push(`${city}/${href}`);
    },
    [city, dragging, router],
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && isUseIntersection && requestParameters && isLastItem && ref.current) {
      const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            dispatch(getEventsBlockClientSide(setEvents, requestParameters));
            observer.unobserve(target);
          }
        });
      };
      const observer = new IntersectionObserver(callback, {});
      observer.observe(ref.current);
    }
  }, [isLastItem, isUseIntersection, requestParameters, setEvents, dispatch]);

  // todo: добавить дефолтный изображение image || ''
  return (
    <div ref={ref} className={`${css.last} w-event-block min-w-event-block mb-3`}>
      <div className={`${css.background} rounded-4xl overflow-hidden w-event-block h-event-block relative`}>
        <Image src={image || ''} layout='fill' alt={slug} className={`${css.position}  ${css.image}`} />
        <div className={`${css.position}  ${css.gradient} cursor-pointer`} onClick={handleRouter(`events/${slug}`)} />
        <div className={`${css.date} absolute bottom-8 left-0 text-turquoise text-h3 flex items-center`}>
          {startDate ? format(startDate, 'dd MMM', { locale: ru }).slice(0, 6) : ''}
        </div>
      </div>
      <div className='relative'>
        <p onClick={handleRouter(`events/${slug}`)} className='text-chrome text-h3 ml-5 cursor-pointer'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default EventBox;
