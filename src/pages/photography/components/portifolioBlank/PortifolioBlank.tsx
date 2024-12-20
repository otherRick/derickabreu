import { useLocation, useNavigate } from 'react-router-dom';
import { PortifoliGallery } from '../PortifoliGallery/PortifoliGallery';

export const PortifolioBlank = () => {
  const location = useLocation();
  const { photoTitle, album } = location.state || {};
  const navigate = useNavigate();

  console.log(photoTitle);

  return (
    <div>
      <div className='bg-zinc-100 py-10 flex justify-center'>
        <div className='items-center flex w-1/3 justify-center'>
          <button className='underline' onClick={() => navigate(-1)}>
            voltar
          </button>
        </div>
        <div className=' items-center flex w-1/3 justify-center'>
          <p>{album}</p>
        </div>
        <div className=' items-center flex w-1/3 justify-center'></div>
      </div>
      <PortifoliGallery sessions={photoTitle} />
    </div>
  );
};
