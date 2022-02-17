import React, { useState } from 'react';
import { setApplicationStatus } from '../store/optionsSlice/optionsSlice';
import { useDispatch } from 'react-redux';
import { ApplicationStatuses } from '../typings/enum';

const ManageButton = ({ status }: { status: ApplicationStatuses }) => {
  const dispatch = useDispatch();
  const [, setClick] = useState(0);

  const handler = () => {
    setClick((prev) => {
      if (prev > 2) {
        dispatch(setApplicationStatus(-1));
        return -1;
      }

      dispatch(setApplicationStatus(prev + 1));
      return prev + 1;
    });
  };
  return (
    <button className='bg-blue-400 fixed bottom-1 right-1 p-2' onClick={handler}>
      Change <span>{status}</span>
    </button>
  );
};

export default ManageButton;
