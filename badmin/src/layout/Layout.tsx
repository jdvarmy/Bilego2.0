import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ThemeProvider from '../theme/ThemeProvider';
import Content from './Content';

const Layout = () => {
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Content />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Layout;
