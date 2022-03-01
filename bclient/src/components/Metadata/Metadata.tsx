import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
  children?: ReactNode;
};

const Metadata = ({ title }: Props) => {
  return (
    <Head>
      <title>Glavnaua</title>
    </Head>
  );
};

export default Metadata;
