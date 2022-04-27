import React, { ReactNode, Children, useRef, useEffect, useState, MouseEvent } from 'react';
import css from './Scrollable.module.css';

type Props = {
  children?: ReactNode;
};

const Scrollable = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  const handleDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.target as HTMLDivElement)) {
      return;
    }
    e.preventDefault();
    setState({ ...state, isScrolling: true, clientX: e.clientX });
  };
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.target as HTMLDivElement)) {
      return;
    }
    e.preventDefault();

    const { clientX, scrollX, isScrolling } = state;
    if (isScrolling) {
      ref.current.scrollLeft = scrollX - e.clientX + clientX;
      const sX = scrollX - e.clientX + clientX;
      const cX = e.clientX;
      setState({
        ...state,
        scrollX: sX,
        clientX: cX,
      });
    }
  };
  const handleUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.target as HTMLDivElement)) {
      return;
    }
    e.preventDefault();
    setState({ ...state, isScrolling: false });
  };
  const handleLive = () => {
    setState({ ...state, isScrolling: false });
  };

  // useEffect(() => {
  //   const { current } = ref;
  //
  //   if (current) {
  //     const handleWheel = (e: WheelEvent) => {
  //       e.preventDefault();
  //       current.scrollTo({
  //         left: current.scrollLeft + e.deltaY * 4,
  //         behavior: 'smooth',
  //       });
  //     };
  //
  //     current.addEventListener('wheel', handleWheel);
  //
  //     return () => current.removeEventListener('wheel', handleWheel);
  //   }
  // }, []);

  return (
    <div
      ref={ref}
      className={`${css.hidden} flex flex-row cursor-pointer overflow-x-scroll overflow-y-hidden`}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onMouseLeave={handleLive}
    >
      {Children.map(children, (child) => Children.only(child))}
    </div>
  );
};

export default Scrollable;
