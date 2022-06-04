import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Button } from '@mui/material';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import { styled } from '@mui/material/styles';

const DialogContentStyled = styled(DialogTitle)(
  ({ theme }) => `
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${theme.typography.pxToRem(12)};
  margin: ${theme.spacing(2, 0, 0, 0)};
  line-height: 1.4;
`,
);

type Props = {
  open: boolean;
  onClose: () => void;
  onDeleteButton: () => void;
  title: string;
};

const ModalDialog = ({ open, onClose, onDeleteButton, title }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContentStyled>{title}</DialogContentStyled>
      <DialogContent>
        <Grid container sx={{ my: 3 }} justifyContent='space-around' alignItems='center'>
          <Grid item>
            <Button variant='contained' color='error' onClick={onDeleteButton} startIcon={<DeleteSweepTwoToneIcon />}>
              Удалить
            </Button>
          </Grid>
          <Grid item>
            <Button variant='outlined' onClick={onClose}>
              Отмена
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
