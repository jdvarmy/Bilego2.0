import React from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const LoginBoxButton = styled(Button)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
`,
);

const LoginBoxLabel = styled(Typography)(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`,
);

const LoginButton = () => {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator('/login');
  };

  return (
    <LoginBoxButton color='secondary' onClick={handleClick}>
      <LoginBoxLabel variant='body1'>Войти</LoginBoxLabel>
      <Avatar variant='rounded' />
    </LoginBoxButton>
  );
};

export default LoginButton;
