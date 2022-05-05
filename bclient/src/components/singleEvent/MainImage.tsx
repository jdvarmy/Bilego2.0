import React from 'react';
import Image from 'next/image';
import css from './sengleEvent.module.css';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import Button from '../Button/Button';
import { Category, Feeling, Genre, Selection } from '../../types/types';
import { EventHeaderComponentProps } from './EventHeader';

const formatString = 'dd MMMM, iiii / HH:mm';

const Term = ({ term }: { term: Category | Genre | Feeling | Selection }) => {
  return (
    <span className='inline-block text-xs border border-chrome rounded-2xl py-1 px-3 lowercase text-chrome mr-2 last:mr-0'>
      {term.name}
    </span>
  );
};

// todo: добавить изображение по умолчанию
const MainImage = ({ city, image, title, date, club, categories, visitorAge }: EventHeaderComponentProps) => {
  const localDate = date ? parseISO(date.replace(' ', 'T')) : undefined;

  return (
    <>
      <Image src={image || '/sold.png'} layout='fill' alt={title} className={`${css.position}  ${css.image}`} />
      <div className={`${css.position}  ${css.gradient}`} />
      <div className='absolute bottom-80 left-20 text-h3 font-light'>
        {localDate && <div className='mb-4'>{format(localDate, formatString, { locale: ru })}</div>}
        {club && <Link href={`/${city}/items/${club.slug}`}>{club.title}</Link>}
      </div>
      <div className='absolute bottom-40 left-20 text-h1'>{title}</div>
      <div className='w-[calc(100%_-_10rem)] absolute bottom-12 left-20 flex justify-between items-center'>
        <div>
          <Button link={`/events/`} className='text-h3'>
            ГОУ
          </Button>
        </div>
        <div>
          {visitorAge ? <span className='mr-3'>{`+${visitorAge}`}</span> : ''}{' '}
          {categories &&
            Object.values(categories).map(
              (category: Category[] | Genre[] | Feeling[] | Selection[] | null) =>
                category && category.map((term) => <Term key={term.slug} term={term} />),
            )}
        </div>
      </div>
    </>
  );
};

export default MainImage;
