import { MouseEvent, useEffect, useRef, useState } from 'react';

export const AMOUNT = 30 as const;

const animationDelay = 0 as const;

export const useIconClickEffect = () => {
  const [show, setShow] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement> | undefined): void => {
    setShow(true);
    // @ts-ignore
    const clientRect: DOMRect = event?.target.getBoundingClientRect();
    setCoords({ x: clientRect.x + clientRect.width / 2, y: clientRect.y + clientRect.height / 2 });
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      setShow(false);
    }, animationDelay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [show]);

  return { show, coords, handleClick };
};
