import React, { ReactChild } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import css from './Particle.module.css';
import { transitionTimingFunction } from '../../types/types';

type Props = {
  show: boolean;
  coords: { x: number; y: number };
  children?: ReactChild;
};

export const Particle = ({ show, coords, children }: Props) => {
  const destinationX = (Math.random() - 0.5) * 100;
  const destinationY = (Math.random() - 0.5) * 100;
  const rotation = Math.random() * 520;
  const scale = Math.random() * 0.3;
  const delay = Math.random() * 300;
  const duration = Math.random() * 1500;

  const style = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction,
    transitionDelay: `${delay}ms`,
  };

  const transitionStart = `translate(-50%, -50%) translate(${coords.x}px, ${coords.y}px) rotate(0deg)`;
  const transitionEnd = `translate(-50%, -50%) translate(${coords.x + destinationX}px, ${
    coords.y + destinationY
  }px) rotate(${rotation}deg) scale(${scale})`;
  const transitionStyles = {
    entering: { opacity: 1, transform: transitionStart },
    entered: { opacity: 1, transform: transitionStart },
    exiting: { opacity: 0, transform: transitionEnd },
    exited: { opacity: 0, transform: transitionEnd },
  };

  return (
    <Transition in={show} timeout={duration} mountOnEnter unmountOnExit>
      {(state: TransitionStatus) => (
        <span className={css.particle} style={{ ...style, ...transitionStyles[state] }}>
          {children}
        </span>
      )}
    </Transition>
  );
};
