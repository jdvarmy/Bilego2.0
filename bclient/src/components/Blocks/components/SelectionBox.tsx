import React from 'react';
import Image from 'next/image';
import css from '../Block.module.css';

type Props = {
  name: string;
  slug: string;
  image?: string;
};

const SelectionBox = ({ name, slug, image }: Props) => {
  // todo: добавить дефолтный изображение image || ''
  return (
    <div className={`${css.background} rounded-4xl overflow-hidden h-event-selection relative`}>
      <Image src={image || '/sold.png'} layout='fill' alt={slug} className={`${css.position}  ${css.image}`} />
    </div>
  );
};

export default SelectionBox;
