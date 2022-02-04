import React from 'react';
import Layout from '../src/layout/Layout';
import dynamic from 'next/dynamic';

// @ts-ignore
// const EventTickets = dynamic(() => import('bticket/eventTickets'), {
//   ssr: false,
// });

const Index = () => {
  return (
    <>
      <Layout>
        <h1 className='text-3xl font-bold underline'>MAIN PAGE</h1>
      </Layout>
      {/*<EventTickets />*/}
    </>
  );
};

export default Index;
