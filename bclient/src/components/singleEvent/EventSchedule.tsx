import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  artistId: number;
};

const EventSchedule = ({ artistId }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            observer.unobserve(target);
          }
        });
      };

      const observer = new IntersectionObserver(callback, {});
      observer.observe(ref.current);
    }
  }, [dispatch]);

  return <div ref={ref}>EventSchedule</div>;
};

export default EventSchedule;
