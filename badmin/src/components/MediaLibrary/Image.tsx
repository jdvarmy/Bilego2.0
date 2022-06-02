import React from 'react';
import { Card, CardHeader, CardContent, IconButton, CardMedia, Typography, CardActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MediaFile } from '../../typings/types';
import { HTTP_URL } from '../../typings/env';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { removeFile } from '../../store/medialibrarySlice/medialibrarySlice';

const Image = ({ file, loading }: { file: MediaFile; loading: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleRemove = () => {
    if (file.id) {
      dispatch(removeFile(file.id));
    }
  };

  return (
    <Card sx={{ width: 305, display: 'inline-block', m: 1 }}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={file.name || file.originalName}
        subheader={file.mimetype}
      />
      <CardMedia sx={{ height: 140 }} image={`${HTTP_URL}${file.path}`} title={file.name || file.originalName} />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={loading} size='small' variant='contained'>
          Выбрать
        </Button>
        <Button disabled={loading} onClick={handleRemove} size='small' color='warning'>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};

export default Image;
