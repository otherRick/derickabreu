import { useNavigate } from 'react-router-dom';

export const SessionCard = ({ to = '/photography', src, alt, title }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(to)}>
      <div className='relative'>
        <p className='absolute text-white z-50 p-2 bg-white w-full bg-opacity-35'>{title}</p>
      </div>
      <img src={src} alt={alt} className='md:max-w-96 w-80 ' />
    </div>
  );
};
