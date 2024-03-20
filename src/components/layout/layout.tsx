import { SetStateAction, useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { userAuth } from '../../../firebase';
import { createProfile } from '../../pages/login/slices/loginSlices';
import { useDispatch } from 'react-redux';

export default function Layout() {
  const [userName, setUserName] = useState<SetStateAction<string> | null>('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = userAuth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          createProfile({
            phoneNumber: firebaseUser.phoneNumber,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            email: firebaseUser.email,
            uid: firebaseUser.uid
          })
        );
        setUserName(firebaseUser.displayName);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const user = userName?.toString().split(' ')[0].toUpperCase();

  return (
    <div className='overflow-hidden md:w-full flex flex-col items-center justify-center md:h-full'>
      <div className='h-full  flex justify-between md:w-9/12 items-center w-9/12 flex-row py-6  '>
        <img
          onClick={() => navigate('/home')}
          src='https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/derick%2FlogoDA.png?alt=media&token=74bea0b1-d0c7-4abe-a2fb-6ec8709bf860'
          alt='logoDA'
          width={60}
          className='hidden md:block'
        />

        <div className=' text-sm md:text-md h-14 items-center w-full  flex flex-row justify-center  md:gap-10 gap-3'>
          <Link to='/home' className='hover:text-gray-300'>
            <p className={location.pathname === '/home' ? 'text-gray-400' : ''}>HOME</p>
          </Link>
          <Link to='/photography' className='hover:text-gray-300'>
            <p className={location.pathname === '/photography' ? 'text-gray-400' : ''}>
              FOTOGRAFIA
            </p>
          </Link>
          <Link to='/about' className='hover:text-gray-300'>
            <p className={location.pathname === '/about' ? 'text-gray-400' : ''}>SOBRE</p>
          </Link>
          <Link to='/contract' className='hover:text-gray-300'>
            <p className={location.pathname === '/contract' ? 'text-gray-400' : ''}>CONTRATAR</p>
          </Link>
          <Link to='/profile' className='hover:text-gray-300 text-yellow-700'>
            <p className={location.pathname === '/profile' ? 'text-gray-400' : ''}>
              {user ? user : 'CLIENTE'}
            </p>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
