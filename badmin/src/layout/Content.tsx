import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
`,
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`,
);

const Content = () => {
  return (
    <>
      <Header />
      <MainWrapper>
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default Content;
