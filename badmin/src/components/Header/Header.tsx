import React from 'react';
import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Logo from '../Logo/Logo';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import HeaderButtons from './HeaderButtons/HeaderButtons';
import HeaderUserBox from './HeaderUserBox/HeaderUserBox';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebar } from '../../store/selectors';
import { toggleSidebar } from '../../store/sidebarSlice/sidebarSlice';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`,
);

const Header = () => {
  const dispatch = useDispatch();
  const { isShow } = useSelector(selectSidebar);

  const sidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <HeaderWrapper display='flex' alignItems='center'>
      <Box display='flex' alignItems='center'>
        <Hidden lgUp>
          <Logo />
        </Hidden>
        <Hidden mdDown>
          <HeaderMenu />
        </Hidden>
      </Box>
      <Box display='flex' alignItems='center'>
        <HeaderButtons />
        <HeaderUserBox />
        <Hidden lgUp>
          <Tooltip arrow title='Toggle Menu'>
            <IconButton color='primary' onClick={sidebarHandler}>
              {!isShow ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;
