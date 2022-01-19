import React, { ReactChild } from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
  children?: ReactChild;
};

const Metadata = ({ title }: Props) => {
  return (
    <Head>
      <title>Glavnaua</title>
    </Head>
  );
};

export default Metadata;
