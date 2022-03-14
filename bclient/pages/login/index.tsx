import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginClientSide } from '../../src/store/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginClientSide({ email, password: pass }));
  };

  const handleChange = (handle) => (e) => {
    handle(e.target.value);
  };

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Login</h1>
      <div className='flex flex-col p-4'>
        <input type='text' name='name' value={email} onChange={handleChange(setEmail)} />
        <input type='text' name='password' value={pass} onChange={handleChange(setPass)} />
        <button onClick={handleLogin}>send</button>
      </div>
    </>
  );
};

export default Login;
