import React, { forwardRef, Fragment, ReactChild, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';
import { transitionTimingFunction, modalSelector } from '../../types/types';

type ModalProps = {
  isOpen?: boolean;
  closeModal?: () => void;
  children?: ReactChild;
};

const ModalWindow = forwardRef<HTMLElement, ModalProps>(function Component(
  { isOpen, closeModal, children }: ModalProps,
  ref,
) {
  useEffect(() => {
    const onOuterClick = (event) => {
      const modal = document.getElementById(modalSelector);

      // @ts-ignore
      if (closeModal && !modal?.contains(event.target) && ref?.current && !ref?.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', onOuterClick, { capture: true });

    return () => {
      document.removeEventListener('mousedown', onOuterClick);
    };
  }, []);

  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
      <Transition
        show={isOpen}
        as={Fragment}
        enter={`transition ${transitionTimingFunction} duration-200`}
        enterFrom='opacity-0 translate-y-2'
        enterTo='opacity-100 translate-y-0'
        leave={`transition ${transitionTimingFunction} duration-250`}
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-2'
      >
        {children}
      </Transition>,
      document.getElementById(modalSelector),
    );
  }

  return null;
});

export default ModalWindow;
