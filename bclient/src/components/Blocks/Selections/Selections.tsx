import React, { useMemo } from 'react';
import TitleBlock from '../conponents/TitleBlock';
import SelectionBox from '../conponents/SelectionBox';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { taxonomySelector } from '../../../store/selectors';
import { Selection } from '../../../types/types';
import SkeletonSelections from '../../Skeletons/SkeletonSelections';

const Selections = () => {
  const { selection } = useTypeSelector(taxonomySelector);
  const localSelection = useMemo(() => selection.filter((item: Selection) => item.showInMainPage), [selection]);

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
