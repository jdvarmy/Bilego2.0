import React, { useMemo } from 'react';
import TitleBlock from '../components/TitleBlock';
import SelectionBox from '../components/SelectionBox';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { taxonomySelector } from '../../../store/selectors';
import { SelectionTax } from '../../../types/types';
import SkeletonSelections from '../../Skeletons/SkeletonSelections';

const Selections = () => {
  const { selection } = useTypeSelector(taxonomySelector);
  const localSelection = useMemo(() => selection.filter((item: SelectionTax) => item.showInMainPage), [selection]);

  return (
    <div className='mt-24 w-full'>
      {localSelection && localSelection.length ? (
        <>
          <TitleBlock title='Подборки Bilego' link={false} />
          <div className='grid grid-cols-2 grid-flow-row gap-9.5'>
            {localSelection.length &&
              localSelection.map((selection) => <SelectionBox key={selection.slug} {...selection} />)}
          </div>
        </>
      ) : (
        <SkeletonSelections />
      )}
    </div>
  );
};

export default Selections;
