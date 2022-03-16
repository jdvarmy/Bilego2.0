import React, { ChangeEvent, Fragment, KeyboardEvent, memo, useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { SearchCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { transitionTimingFunction } from '../../types/types';
import { AMOUNT, useIconClickEffect } from '../../hooks/useIconClickEffect';
import { Particle } from '../Particle/Particle';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const { show, coords, handlerClick } = useIconClickEffect();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handlerFocus = () => {
    inputRef.current?.focus();
  };
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
  const handlerSearchIcon = () => {
    if (!searchValue) {
      handlerFocus();
    } else {
      alert('search');
    }
  };

  useEffect(() => {
    const onOuterClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', onOuterClick, { capture: true });

    return () => {
      document.removeEventListener('mousedown', onOuterClick);
    };
  }, []);

  return (
    <div className='mt-2 mb-4' ref={wrapperRef}>
      <div className='relative h-9 bg-white w-96 border-0 rounded-2xl'>
        <span onClick={handlerClick}>
          <SearchCircleIcon
            className='absolute top-1.5 left-3.5 h-6 w-6 inline-block text-my-blue-liter cursor-pointer'
            onClick={handlerSearchIcon}
          />
          {Array(AMOUNT)
            .fill(1)
            .map((item, key) => (
              <Particle show={show} coords={coords} key={key}>
                <SearchCircleIcon
                  stroke={`hsl(${Math.random() * 50 + 308.66}, 75.23%, 57.25%)`}
                  className='h-6 w-6 inline-block text-my-blue-liter'
                  onClick={handlerSearchIcon}
                />
              </Particle>
            ))}
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
      </Transition>
    </div>
  );
};

export default memo(Search);
