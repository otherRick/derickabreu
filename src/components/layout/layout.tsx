import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 300);
  }, [navigate]);

  return (
    <div className='overflow-hidden md:w-full items-center justify-center md:h-full'>
      <div className='md:w-full h-full flex justify-center md:gap-[600px] gap-4 flex-row py-6 md:px-20'>
        <div onClick={() => navigate('/home')} className='cursor-pointer '>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/derick%2FlogoDA.png?alt=media&token=74bea0b1-d0c7-4abe-a2fb-6ec8709bf860'
            alt='logoDA'
            width={60}
          />
        </div>
        <div className='text-sm md:text-md h-14 items-center flex flex-row justify-center  md:gap-10 gap-4'>
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
        </div>
      </div>
      <Outlet />
    </div>
  );
}
