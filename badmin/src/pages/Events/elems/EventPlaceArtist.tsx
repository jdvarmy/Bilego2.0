import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import SelectWithSearch from '../../../components/SelectWithSearch/SelectWithSearch';
import { Event } from '../../../typings/types';
import { useChangeFnEventField } from '../../../hooks/useChangeFnEventField';
import { getArtistListForEvent } from '../../../store/artistsSlice/artistsSlice';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';

type Props = {
  artist?: Event['artist'];
  handleDelete: () => void;
};

const EventPlaceArtist = ({ artist, handleDelete }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [artists, setArtists] = useState<Event['artist']>([]);

  const handleChangeArtist = useChangeFnEventField('artist');
  const fetchFnArtists = (search: string) => {
    dispatch(getArtistListForEvent(search, setArtists));
  };

  return (
    <SelectWithSearch
      value={artist || []}
      label='Выступающий артист (артисты)'
      fullWidth
      multiple
      onChange={handleChangeArtist}
      fetchFn={fetchFnArtists}
      onDelete={handleDelete}
    >
      {Array.isArray(artists) &&
        artists
          .filter((i) => i?.uid)
          .map((i) => (
            // todo: при смене массива с данными можно выбрать повторно одну и туже запись
            // нужно сделать пункты меню выделяемыми в зависимости от стейта артистов, сейчас это не работает
            <MenuItem selected={artist?.map((a) => a?.uid).includes(i?.uid)} key={i?.uid} value={i as any}>
              {i?.title}
            </MenuItem>
          ))}
    </SelectWithSearch>
  );
};

export default EventPlaceArtist;
