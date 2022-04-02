import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { userSelector } from '../../store/selectors';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { checkIsUserLoginClientSide, loginClientSide, logoutClientSide } from '../../store/user/userSlice';
import { storageTokenName } from '../../types/types';

const User = () => {
  const dispatch = useDispatch();
  const { isLogin } = useTypeSelector(userSelector);

  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState('jdvarmy1@gmail.com');
  const [pass, setPass] = useState('');

  const handlerCloseLogin = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleShowLogin = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handlerLogin = () => {
    dispatch(loginClientSide({ email: login, password: pass }));
  };
  const handleLogout = () => {
    dispatch(logoutClientSide());
  };

  useEffect(() => {
    if (localStorage.getItem(storageTokenName) && !isLogin) {
      dispatch(checkIsUserLoginClientSide());
    }
  }, [dispatch]);

  return (
    <div className='ml-3'>
      {!isLogin ? (
        <>
          <div onClick={handleShowLogin}>Login</div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={handlerCloseLogin}>
              <div className='min-h-screen px-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Dialog.Overlay className='fixed inset-0' />
                </Transition.Child>
                <span className='inline-block h-screen align-middle' aria-hidden='true'>
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <div className='inline-block bg-my-purple w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl'>
                    <Dialog.Title as='h3' className='text-lg font-medium'>
                      Временный Логин
                    </Dialog.Title>
                    <div className='mt-2'>
                      <div>
                        <input
                          type='text'
                          className='text-blue-800'
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        />{' '}
                        email
                      </div>
                      <div className='mt-2'>
                        <input
                          type='text'
                          className='text-blue-800'
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                        />{' '}
                        password
                      </div>
                    </div>
                    <div className='mt-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium border rounded-md'
                        onClick={handlerLogin}
                      >
                        Залогиниться
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default User;
