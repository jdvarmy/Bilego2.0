import React, { FC, ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Badge, Collapse, ListItem } from '@mui/material';
import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { toggleSidebar } from '../../../store/sidebarSlice/sidebarSlice';
import { AppDispatch } from '../../../store/store';

interface SidebarMenuItemProps {
  name: string;
  link: string;
  icon: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  children?: ReactNode;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  link,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  ...rest
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent || false);

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component='div' className='Mui-children' key={name} {...rest}>
        <Button
          className={clsx({ 'Mui-active': menuToggle })}
          startIcon={Icon && <Icon />}
          endIcon={menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
          onClick={toggleMenu}
        >
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component='div' key={name} {...rest}>
      <Button component={RouterLink} onClick={handleClick} to={link} startIcon={Icon && <Icon />}>
        {name}
        {badge && <Badge badgeContent={badge} />}
      </Button>
    </ListItem>
  );
};

export default SidebarMenuItem;
