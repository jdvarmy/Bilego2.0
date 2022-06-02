import React, { SyntheticEvent, forwardRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { UserRole } from '../../typings/enum';
import { IMaskInput } from 'react-imask';
import { v4 as uidv4 } from 'uuid';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MediaLibrary from '../../components/MediaLibrary/MediaLibrary';

const userRoleMap: Record<UserRole, string> = {
  [UserRole.admin]: 'Администратор',
  [UserRole.manager]: 'Менеджер сайта',
  [UserRole.organizer]: 'Организатор',
  [UserRole.subscriber]: 'Подписчик',
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='+{7}(000) 000-00-00'
      // @ts-ignore
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

type State = {
  email: string;
  password: string;
  activation: boolean;
  role: UserRole;
  sendMail: boolean;
  avatar: string;
  name: string;
  surname: string;
  birthdate: Date | null;
  phone: string;
  concertManagerInfo: string;
  concertManagerPercentage: string;
};

const CreateUser = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    activation: true,
    role: UserRole.subscriber,
    sendMail: false,
    avatar: '',
    name: '',
    surname: '',
    birthdate: null,
    phone: '',
    concertManagerInfo: '',
    concertManagerPercentage: '',
  });
  const [openMedia, setOpenMedia] = useState<boolean>(false);

  const handleOpenMedia = () => {
    setOpenMedia(true);
  };
  const handleCloseMedia = () => {
    setOpenMedia(false);
  };

  const handleChange = (field: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  const handleChangeCheckbox = (field: keyof State) => (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
    setValues({
      ...values,
      [field]: checked,
    });
  };
  const handleChangeDate = (value: Date | null) => {
    setValues({ ...values, birthdate: value });
  };
  const generatePassword = () => {
    setValues({
      ...values,
      password: uidv4().split('-').at(0) || '',
    });
  };

  // console.log(values);

  return (
    <>
      <Helmet>
        <title>Регистрация пользователя</title>
      </Helmet>
      <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
        <Grid item />
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 }, mx: 2 }}
            variant='contained'
            startIcon={<AddTwoToneIcon fontSize='small' />}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Регистрация пользователя' />
            <Divider />
            <CardContent>
              <Box>
                <Grid container spacing={3} alignItems='center'>
                  <Grid item xs={4}>
                    <TextField
                      label='Email'
                      type='email'
                      fullWidth
                      value={values.email}
                      focused={!!values.email}
                      onChange={handleChange('email')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label='Логин'
                      type='text'
                      InputProps={{ readOnly: true }}
                      fullWidth
                      value={values.email || 'Логин будет сформирован автоматически'}
                    />
                  </Grid>
                  <Grid item xs={4} />
                  <Grid item xs={4} sx={{ display: 'flex' }}>
                    <TextField
                      label='Пароль'
                      type='text'
                      fullWidth
                      value={values.password}
                      focused={!!values.password}
                      onChange={handleChange('password')}
                    />
                    <IconButton color='primary' onClick={generatePassword}>
                      <VpnKeyTwoToneIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      value={values.role}
                      label='Роль пользователя'
                      fullWidth
                      focused
                      onChange={handleChange('role')}
                    >
                      {Object.entries(userRoleMap).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4} />
                  <Grid item xs={12}>
                    <FormControlLabel
                      value={values.activation}
                      control={<Checkbox defaultChecked color='success' />}
                      label='Активировать пользователя?'
                      labelPlacement='end'
                      onChange={handleChangeCheckbox('activation')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      value={values.sendMail}
                      control={<Checkbox color='success' />}
                      label='Отправить письмо на почту с информацией о регистрации?'
                      labelPlacement='end'
                      onChange={handleChangeCheckbox('sendMail')}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Дополнительные данные' />
            <Divider />
            <CardContent>
              <Box>
                <Grid container spacing={3} alignItems='center'>
                  <Grid item xs={4} sx={{ display: 'flex' }}>
                    <TextField label='Аватар' type='text' fullWidth />
                    <IconButton color='primary' onClick={handleOpenMedia}>
                      <CloudUploadTwoToneIcon />
                    </IconButton>
                    <MediaLibrary open={openMedia} closeHandler={handleCloseMedia} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label='Имя'
                      type='text'
                      fullWidth
                      value={values.name}
                      focused={!!values.name}
                      onChange={handleChange('name')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label='Фамилия'
                      type='text'
                      fullWidth
                      value={values.surname}
                      focused={!!values.surname}
                      onChange={handleChange('surname')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl variant='outlined' fullWidth focused={!!values.phone}>
                      <InputLabel>Телефон</InputLabel>
                      <Input
                        value={values.phone}
                        onChange={handleChange('phone')}
                        inputComponent={TextMaskCustom as any}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label='Дата рождения'
                        inputFormat='dd/MM/yyyy'
                        value={values.birthdate}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField focused={!!values.birthdate} fullWidth {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4} />
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {values.role === UserRole.organizer && (
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Данные организатора' />
              <Divider />
              <CardContent>
                <Box>
                  <Grid container spacing={3} alignItems='center'>
                    <Grid item xs={4}>
                      <TextField
                        label='Процент сделок'
                        type='number'
                        fullWidth
                        value={values.concertManagerPercentage}
                        focused={!!values.concertManagerPercentage}
                        onChange={handleChange('concertManagerPercentage')}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        label='ИНН организатора и дополтительная информация'
                        type='text'
                        fullWidth
                        value={values.concertManagerInfo}
                        focused={!!values.concertManagerInfo}
                        onChange={handleChange('concertManagerInfo')}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CreateUser;
