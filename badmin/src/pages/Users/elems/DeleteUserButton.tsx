import React, { useState } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteUser } from '../../../store/usersSlice/usersSlice';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import ModalDialog from '../../../components/ModalDialog/ModalDialog';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';

type Props = {
  email: string;
  uid?: string;
};

const DeleteUserButton = ({ uid, email }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleDeleteUser = (uid?: string) => () => {
    if (uid) {
      dispatch(deleteUser(uid));
      setOpenDelete(false);
    }
  };
  const handleOpenModal = () => {
    setOpenDelete(true);
  };
  const handleCloseModal = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Tooltip placement='top' title={`Удалить ${email}`} arrow>
        <IconButton
          onClick={handleOpenModal}
          sx={{
            '&:hover': { background: theme.colors.error.lighter },
            color: theme.palette.error.main,
          }}
          color='inherit'
          size='small'
        >
          <DeleteTwoToneIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <ModalDialog
        open={openDelete}
        onClose={handleCloseModal}
        actionButton={{
          variant: 'contained',
          color: 'error',
          startIcon: <DeleteSweepTwoToneIcon />,
          label: 'Удалить',
          onClick: handleDeleteUser(uid),
        }}
        title={`Вы уверены, что хотите удалить ${email}?`}
      />
    </>
  );
};

export default DeleteUserButton;
