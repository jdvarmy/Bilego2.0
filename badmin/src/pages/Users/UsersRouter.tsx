import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerSuspense } from '../../hof/routerSuspense';

const Users = lazy(() => import('./Users'));
const CreateUser = lazy(() => import('./CreateUser'));

const UsersRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={routerSuspense(Users)} />
        <Route path='create' element={routerSuspense(CreateUser)} />
      </Routes>
    </div>
  );
};

export default UsersRouter;
