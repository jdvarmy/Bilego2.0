import React, { useEffect } from 'react';
import MenuItem from './MenuItem';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { taxonomySelector } from '../../store/selectors';
import { useDispatch } from 'react-redux';
import { getTaxonomiesClientSide } from '../../store/taxonomy/taxonomySlice';
import { SelectionTax } from '../../types/types';

const Menu = () => {
  const dispatch = useDispatch();
  const { selection, category } = useTypeSelector(taxonomySelector);

  useEffect(() => {
    if (!category.length) {
      dispatch(getTaxonomiesClientSide());
    }
  }, [dispatch, category]);

  return (
    <>
      <nav className='mt-14'>
        <div className='text-turquoise'>подборки</div>
        <div className='text-xs'>
          <MenuItem title='выходные' href='/events?holy=1' />
          <MenuItem title='ближайшие' href='/events?closest=1' />
          {selection
            .filter((item) => item.showInMenu)
            .sort((a, b) => (a.sort && b.sort ? a.sort - b.sort : 0))
            .map((item: SelectionTax) => (
              <MenuItem key={item.slug} title={item.name} href={`/events?selection=[${item.slug}]`} />
            ))}
        </div>
      </nav>
      {category.length ? (
        <nav className='mt-8'>
          <div className='text-turquoise'>формат</div>
          <div className='text-xs'>
            {category
              .filter((item) => item.showInMenu)
              .sort((a, b) => (a.sort && b.sort ? a.sort - b.sort : 0))
              .map((item: SelectionTax) => (
                <MenuItem key={item.slug} title={item.name} href={`/events?category=[${item.slug}]`} />
              ))}
          </div>
        </nav>
      ) : (
        <div />
      )}
    </>
  );
};

export default Menu;
