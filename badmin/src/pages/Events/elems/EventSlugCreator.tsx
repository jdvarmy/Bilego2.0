import React, { useState, memo } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import { EventStateFieldType, saveEvent, setEventStateField } from '../../../store/eventsSlice/eventsSlice';
import { useSearchParams } from 'react-router-dom';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useLocalSearchParams } from '../../../hooks/useLocalSearchParams';

type Props = {
  uid?: string;
  slug?: string;
};

const EventSlugCreator = ({ uid, slug }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const params = useLocalSearchParams();

  console.log('render EventSlugCreator');

  const [edit, setEdit] = useState<boolean>(false);
  const [localSlug, setLocalSlug] = useState<string | undefined>(slug);

  const handleClick = () => {
    setEdit((prev) => !prev);
    setLocalSlug(slug);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSlug(e.target.value);
  };

  const handleSave = () => {
    setEdit((prev) => !prev);
    if (!localSlug) {
      setLocalSlug(slug);
      return;
    }

    if (uid) {
      // @ts-ignore
      const cyrillicToTranslit = new CyrillicToTranslit();
      const updatedSlug = cyrillicToTranslit.transform(localSlug, '-').toLowerCase();

      dispatch(setEventStateField({ slug: updatedSlug } as EventStateFieldType));

      setSearchParams({ ...params, slug: updatedSlug });
      dispatch(saveEvent({ uid, slug: updatedSlug }));
    }
  };

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleSave();
    }
  };

  return edit ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label='Ссылка на событие'
        size='small'
        type='text'
        focused
        autoFocus
        value={localSlug}
        onChange={handleChange}
        onKeyDown={keyPress}
      />
      <IconButton color='primary' onClick={handleSave}>
        <SaveTwoToneIcon />
      </IconButton>
    </Box>
  ) : (
    <Button size='small' startIcon={<LinkTwoToneIcon fontSize='small' />} onClick={handleClick}>
      {slug}
    </Button>
  );
};

export default memo(EventSlugCreator);
