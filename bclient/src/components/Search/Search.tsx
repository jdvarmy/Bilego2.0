import React, { ChangeEvent, Fragment, KeyboardEvent, memo, useCallback, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { SearchCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/outline';
import { transitionTimingFunction } from '../../types/types';
import ModalWindow from '../ModalWindow/ModalWindow';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleRemoveSearchValue = () => {
    setSearchValue('');
    handleFocus();
    setIsOpen(true);
  };
  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      alert('search');
    }
  };
  const handleSearchIconClick = () => {
    if (!searchValue) {
      handleFocus();
      handleOpenModal();
    } else {
      alert('search');
    }
  };

  return (
    <div ref={wrapperRef}>
      <div className='relative h-9 bg-white w-96 border-0 rounded-2xl'>
        <span>
          <SearchCircleIcon
            className='absolute top-1.5 left-3.5 h-6 w-6 inline-block text-blue-800 cursor-pointer stroke-1'
            onClick={handleSearchIconClick}
          />
        </span>
        <input
          ref={inputRef}
          type='text'
          className='h-9 ml-12 w-72 text-blue-800 border-none outline-none'
          value={searchValue}
          onClick={handleOpenModal}
          onKeyUp={handleSearch}
          onChange={handleSearchValue}
        />
        <Transition
          show={!!searchValue}
          as={Fragment}
          enter={`transition ${transitionTimingFunction} duration-50`}
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave={`transition ${transitionTimingFunction} duration-50`}
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <XIcon
            className='absolute top-2 right-2 h-5 w-5 inline-block text-blue-800 cursor-pointer transition-all stroke-1'
            onClick={handleRemoveSearchValue}
          />
        </Transition>
      </div>
      <ModalWindow isOpen={isOpen} closeModal={handleCloseModal} ref={wrapperRef}>
        <div className='absolute left-90 top-22 w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
          <h3 className='text-h3 text-purple'>Поиск</h3>
          <div className='mt-2'>
            <p className='text-xs text-purple'>Здесь будут всякие ссылки на поисковые запросы.</p>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-xs text-purple border rounded-md border-purple'
              onClick={handleCloseModal}
            >
              Ясно, спасибо!
            </button>
          </div>
        </div>
      </ModalWindow>
    </div>
  );
};

export default memo(Search);
