import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardHeader,
  Divider,
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Button,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { NavLink } from 'react-router-dom';
import UsersTable from './elems/UsersTable';

type Filters = 'Любой' | 'Активнен' | 'Не активнен';
const statusOptions = [
  { id: 'all', name: 'Любой' },
  { id: 'active', name: 'Активен' },
  { id: 'inactive', name: 'Не активен' },
];

const Users = () => {
  const [filters, setFilters] = useState<{ status: Filters | null }>({
    status: null,
  });

  const handleStatusChange = (event: SelectChangeEvent<string>): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: event.target.value as Filters,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Пользователи</title>
      </Helmet>
      <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 }, mx: 2 }}
            variant='contained'
            startIcon={<AddTwoToneIcon fontSize='small' />}
            component={NavLink}
            to='create'
          >
            Новый пользователь
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel>Статус</InputLabel>
                <Select value={filters.status || 'all'} onChange={handleStatusChange} label='Статус' autoWidth>
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title='Данные пользователей'
        />
        <Divider />
        <UsersTable />
      </Card>
    </>
  );
};

export default Users;
