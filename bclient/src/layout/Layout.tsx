import React, { ReactChild } from 'react';
import Metadata from '../components/Metadata/Metadata';
import Header from '../components/Header/Header';

type Props = {
  children?: ReactChild;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Metadata />
      <Header />
      {children}
    </>
  );
};

export default Layout;
