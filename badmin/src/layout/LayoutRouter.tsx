import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Page404 from '../pages/Page404/Page404';
import Layout from './Layout';
import { routerSuspense } from '../hof/routerSuspense';

const EventsRouter = routerSuspense(lazy(() => import('../pages/Events/EventsRouter')));
const ItemsRouter = routerSuspense(lazy(() => import('../pages/Items/ItemsRouter')));
const ArtistsRouter = routerSuspense(lazy(() => import('../pages/Artists/ArtistsRouter')));

const LayoutRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='events/*' element={EventsRouter} />
        <Route path='items/*' element={ItemsRouter} />
        <Route path='artists/*' element={ArtistsRouter} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default LayoutRouter;
