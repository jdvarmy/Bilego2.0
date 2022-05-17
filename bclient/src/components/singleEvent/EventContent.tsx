import React, { useMemo, useState } from 'react';
import EventTitleBlock from './components/EventTitleBlock';
import { ChevronDownIcon } from '@heroicons/react/solid';
import css from './sengleEvent.module.css';

type Props = {
  text: string;
};

const charLimit = 255;

const EventContent = ({ text }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const html = useMemo(() => {
    if (isOpen) {
      return text.length < charLimit ? text : text.slice(0, charLimit) + '\u2026';
    }

    return text;
  }, [isOpen]);

  const handleClick = (flag: boolean) => () => {
    setIsOpen(flag);
  };

  return (
    <div>
      <EventTitleBlock title='О концерте' />
      <div className={`inline ${isOpen ? css.inline : ''}`} dangerouslySetInnerHTML={{ __html: html }} />
      {isOpen && (
        <ChevronDownIcon
          className='h-5 w-5 stroke-1 inline-block text-raspberry cursor-pointer ml-3'
          onClick={handleClick(false)}
        />
      )}
    </div>
  );
};

export default EventContent;
