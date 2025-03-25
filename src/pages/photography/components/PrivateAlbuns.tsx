import { SessionCard } from './sessionCard/SessionCard';
import { useNavigate } from 'react-router-dom';

export const PrivateAlbuns = () => {
  const navigate = useNavigate();

  return (
    <div className='py-20'>
      <div className='pb-10 items-center flex justify-center w-full'>
        <p>EVENTOS PRIVADOS</p>
      </div>

      <div className='space-y-7 md:space-y-0 gap-10 md:grid-cols-4 md:grid'>
        <SessionCard
          keyPass={false}
          nav={() => navigate(`/photography/private`)}
          alt={'alt'}
          title={'Eventos Privados'}
          src={
            'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fdecor2.jpg?alt=media&token=d44d1f95-78cd-44f4-b083-cd5728c46907'
          }
          onClick={() => navigate(`/photography/private`)}
        />
      </div>
    </div>
  );
};
