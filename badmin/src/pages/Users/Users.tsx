import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardHeader,
  Divider,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Tooltip,
  IconButton,
  Box,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Button,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getUsers } from '../../store/usersSlice/usersSlice';
import { selectUsers } from '../../store/selectors';
import { User } from '../../typings/types';
import { ru } from 'date-fns/locale';
import Label from '../../components/Label/Label';
import { NavLink } from 'react-router-dom';

type Filters = 'Любой' | 'Активнен' | 'Не активнен';
const statusOptions = [
  { id: 'all', name: 'Любой' },
  { id: 'active', name: 'Активен' },
  { id: 'inactive', name: 'Не активен' },
];

const Users = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const { users } = useSelector(selectUsers);

  const [filters, setFilters] = useState<{ status: Filters | null }>({
    status: null,
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell>Имя, фамилия</TableCell>
                <TableCell>Данные</TableCell>
                <TableCell>Доступ</TableCell>
                <TableCell align='right'>Статус</TableCell>
                <TableCell align='right'>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: User) => (
                <TableRow key={user.uid} hover>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.name} {user.surname}
                  </TableCell>
                  <TableCell>
                    {!!user.birthdate && format(new Date(user.birthdate), 'dd MMMM, yyyy', { locale: ru })}
                    <br />
                    {user.phone}
                  </TableCell>
                  <TableCell>{user.access?.map(({ ip, device }) => `ip: ${ip} - ${device}`)}</TableCell>
                  <TableCell align='right'>
                    {user.status === 1 ? (
                      <Label color='success'>Активен</Label>
                    ) : (
                      <Label color='warning'>Не активен</Label>
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    <Tooltip placement='top' title='Редактировать' arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.primary.lighter },
                          color: theme.palette.primary.main,
                        }}
                        color='inherit'
                        size='small'
                      >
                        <EditTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement='top' title='Удалить' arrow>
                      <IconButton
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default Users;
