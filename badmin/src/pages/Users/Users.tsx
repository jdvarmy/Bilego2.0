import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Tooltip,
  IconButton,
  Box,
  useTheme,
  Chip,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getUsers } from '../../store/usersSlice/usersSlice';
import { selectUsers } from '../../store/selectors';
import { User } from '../../typings/types';
import { ru } from 'date-fns/locale';

const Users = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const { users } = useSelector(selectUsers);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title>Пользователи</title>
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              titleTypographyProps={{}}
              subheaderTypographyProps={{}}
              title='Пользователи'
              subheader='Зарегистрированные пользователи bilego'
            />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell>Имя, фамилия</TableCell>
                    <TableCell>Данные</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Доступ</TableCell>
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
                      <TableCell>
                        {user.status === 1 ? (
                          <Chip label='Активен' color='success' size='small' />
                        ) : (
                          <Chip label='Не активен' color='warning' size='small' />
                        )}
                      </TableCell>
                      <TableCell>{user.access?.map(({ ip, device }) => `ip: ${ip} - ${device}`)}</TableCell>
                      <TableCell align='right'>
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
            <Box p={2}>
              <TablePagination
                component='div'
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
