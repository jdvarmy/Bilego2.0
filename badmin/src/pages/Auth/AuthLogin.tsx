import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // @ts-ignore
  const fromPage = location.state?.from || '/';
  console.log('fromPage', fromPage);

  return <div>AuthLogin</div>;
};

export default AuthLogin;
