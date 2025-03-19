import { photosession } from '../helpers/photosession';
import { SessionCard } from './sessionCard/SessionCard';
import { useNavigate } from 'react-router-dom';

export const PublicAlbuns = () => {
  const navigate = useNavigate();

  return (
    <div className='py-20'>
      <div className='pb-10 items-center flex justify-center w-full'>
        <p>EVENTOS PÚBLICOS</p>
      </div>

      <div className='space-y-7 md:space-y-0 gap-10 md:grid-cols-4 md:grid'>
        {photosession.map(({ alt, album, src, keyPass, payToview }) => {
          return (
            <>
              <SessionCard
                keyPass={keyPass}
                nav={() =>
                  navigate(`/photography/private/${album}`, {
                    state: { album, keyPass, alt, payToview }
                  })
                }
                alt={alt}
                title={album}
                src={src}
                onClick={() => {}}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
