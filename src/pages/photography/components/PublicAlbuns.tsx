import { SessionCard } from './sessionCard/SessionCard';
import { useNavigate } from 'react-router-dom';

export const PublicAlbuns = () => {
  const navigate = useNavigate();

  const photosession = [
    {
      alt: 'dewachen',
      album: 'Dewachen Plantio',
      keyPass: 'plantamos',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/plantamos%2Fplantamos%20(4).jpg?alt=media&token=7963a21f-3967-4013-96da-33029eadde10'
    },
    {
      alt: 'cebb',
      album: 'Confraternização Cebb Campinas 2024',
      keyPass: 'cebbcps24',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/cebbcps24%2F46.jpg?alt=media&token=766c3525-a68f-4a00-8089-b413585c30fa'
    },
    {
      alt: 'dh8',
      album: 'Dia de treino DH8',
      keyPass: 'Dh8praia',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/Dh8praia%2Fdh8-116.jpg?alt=media&token=eba6f2e0-3850-4fc3-b94e-7dd9c62d3551'
    }
  ];

  return (
    <div className='py-20'>
      <div className='pb-10 items-center flex justify-center w-full'>
        <p>EVENTOS PÚBLICOS</p>
      </div>

      <div className='space-y-7 md:space-y-0 gap-10 md:grid-cols-4 md:grid'>
        {photosession.map(({ alt, album, src, keyPass }) => {
          return (
            <>
              <SessionCard
                keyPass={keyPass}
                nav={() => navigate('/photography/public', { state: { album, keyPass } })}
                alt={alt}
                title={album}
                src={src}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
