import React, {
  ChangeEvent,
  forwardRef,
  Fragment,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';
import { SearchCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { transitionTimingFunction } from '../../types/types';
import dynamic from 'next/dynamic';
import { ModalSelector } from '../../types/enums';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ isOpen, closeModal }, ref) => {
  if (typeof window === 'object') {
    return ReactDOM.createPortal(
      <Transition
        ref={ref}
        show={isOpen}
        as={'div'}
        className={ModalSelector}
        enter={`transition ${transitionTimingFunction} duration-200`}
        enterFrom='opacity-0 translate-y-2'
        enterTo='opacity-100 translate-y-0'
        leave={`transition ${transitionTimingFunction} duration-250`}
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-2'
      >
        <div className='absolute left-72 top-20 w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
          <h3 className='text-lg text-my-purple'>Поиск</h3>
          <div className='mt-2'>
            <p className='text-sm text-my-purple'>Здесь будут всякие ссылки на поисковые запросы.</p>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm text-my-purple border rounded-md border-my-purple'
              onClick={closeModal}
            >
              Ясно, спасибо!
            </button>
          </div>
        </div>
      </Transition>,
      document.body,
    );
  }

  return null;
});

const ModalComponentWithNoSSR = dynamic(() => Promise.resolve(Modal), { ssr: false });

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handlerFocus = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);
  const handlerSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handlerRemoveSearchValue = () => {
    setSearchValue('');
    handlerFocus();
  };
  const handlerSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      alert('search');
    }
  };
  const handlerSearchIconClick = () => {
    if (!searchValue) {
      handlerFocus();
      openModal();
    } else {
      alert('search');
    }
  };

  useEffect(() => {
    const onOuterClick = (event) => {
      const modal = document.querySelector(`.${ModalSelector}`);
      if (!wrapperRef.current?.contains(event.target) && !modal?.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', onOuterClick, { capture: true });

    return () => {
      document.removeEventListener('mousedown', onOuterClick);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div className='relative h-9 bg-white w-96 border-0 rounded-2xl'>
        <span>
          <SearchCircleIcon
            className='absolute top-1.5 left-3.5 h-6 w-6 inline-block text-my-blue-liter cursor-pointer'
            onClick={handlerSearchIconClick}
          />
        </span>
        <input
          ref={inputRef}
          type='text'
          className='h-9 ml-12 w-72 text-my-blue-liter border-none outline-none'
          value={searchValue}
          onClick={openModal}
          onKeyUp={handlerSearch}
          onChange={handlerSearchValue}
        />
        <Transition
          show={!!searchValue}
          as={Fragment}
          enter={`transition ${transitionTimingFunction} duration-200`}
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave={`transition ${transitionTimingFunction} duration-250`}
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <XIcon
            className='absolute top-2 right-2 h-5 w-5 inline-block text-my-blue-liter cursor-pointer transition-all'
            onClick={handlerRemoveSearchValue}
          />
        </Transition>
      </div>
      <ModalComponentWithNoSSR isOpen={isOpen} closeModal={closeModal} ref={modalRef} />
    </div>
  );
};

export default memo(Search);
