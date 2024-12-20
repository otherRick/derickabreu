import { SessionCard } from './sessionCard/SessionCard';

import { useNavigate } from 'react-router-dom';

export const Portifolio = () => {
  const navigate = useNavigate();

  const photosession = [
    {
      photoTitle: [
        'barro.jpg',
        'barcas.jpg',
        'buda1.jpeg',
        'paIpanema.jpg',
        'produto1.jpg',
        'pa3.jpg'
      ],
      alt: 'DOCUMENTAL',
      album: 'DOCUMENTAL',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fbarro.jpg?alt=media&token=4acac59e-7b7f-4b09-aa2e-0f9d39920752'
    },
    {
      photoTitle: [
        'infantil2.jpg',
        'infantil12.jpg',
        'infantil15.jpg',
        'bolofesta.jpg',
        'aniver7.JPG',
        'eyes1.jpeg',
        // sessão em pé
        'espkid1.JPG',
        // 'jp1.jpg',
        'kids2.JPG',
        'kids3.JPG',
        'kids4.JPG',
        'kids5.JPG',
        'kids6.JPG',
        'kids7.JPG',
        'kids8.JPG',
        'lau1.jpg',
        'infantil13.jpg',
        'intantil14.jpg',
        'newborn1.jpg',
        'newborn2.jpg',
        'newborn3.jpg',
        'newborn4.jpg',
        // sessão em pé
        'infantil11.jpg',
        'judo1.jpeg'
      ],
      alt: 'home',
      album: 'INFÂNCIA',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Finfantil15.jpg?alt=media&token=eccfa75b-77a7-4c61-8f78-f94f484dc3a1'
    },
    {
      photoTitle: [
        'clareou2.jpg',
        'decor1.jpg',
        'decor2.jpg',
        'festa4.jpg',
        'festa7.jpg',
        'djdjondjon.jpg',
        'clareou1.jpg',
        'esp13.jpg',
        'esp14.jpg',
        'esp15.jpg',
        'esp16.jpg',
        'esp19.jpg',
        // sessão em pé
        'anav1.jpeg',
        'esp18.jpg',
        'esp2.jpg',
        'esp1.jpg',
        // sessão em pé
        'esp20.jpg',
        'esp17.jpg',
        'esp3.jpg',
        'esp8.jpg',
        'idoso1.JPG',
        'idoso2.JPG',
        'matheus1.jpg',
        'self3.jpg',
        // sessão media
        'festa1.jpeg',
        // sessão media
        'shows2.jpg',
        'shows3.jpg',
        'trem1.jpg',
        'ugopalco.jpg',
        'mumu1.jpeg',
        'thi1.jpeg'
      ],
      alt: 'home',
      album: 'CELEBRAÇÕES',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fesp3.jpg?alt=media&token=764e28ff-0ee3-43fb-9ae4-a4108cd9aa89'
    },
    {
      photoTitle: [
        'mag2.jpeg',
        'ensaio10.jpg',
        'mag3.jpeg',
        'mag1.jpeg',
        'newborn1.jpg',
        'newborn2.jpg',
        'newborn3.jpg',
        'newborn4.jpg',
        'prof1.jpeg',
        'prof2.jpeg'
      ],
      alt: 'home',
      album: 'GESTANTES',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fmag2.jpeg?alt=media&token=31b65b4c-ea16-4411-a3e7-46410df162aa'
    },
    {
      photoTitle: [
        'clareou2.jpg',
        'dj1.jpeg',
        'decor1.jpg',
        'decor2.jpg',
        'festa4.jpg',
        'festa7.jpg',
        'djdjondjon.jpg',
        'clareou1.jpg',
        'danca1.jpeg',
        'danca2.jpg',
        'anav1.jpeg',
        'matheus1.jpg',
        'festa1.jpeg',
        'shows2.jpg',
        'shows3.jpg',
        'trem1.jpg',
        'ugopalco.jpg',
        'mumu1.jpeg',
        'thi1.jpeg'
      ],
      alt: 'home',
      album: 'PALCO',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fmumu1.jpeg?alt=media&token=a049689d-e9bd-4d3b-b093-61193bde338d'
    },
    {
      photoTitle: [
        'ellus.jpg',
        'buda1.jpeg',
        'produto1.jpg',
        'drink2.jpeg',
        'drink1.jpeg',
        'drink7.jpg',
        'esp2.jpg',
        'esp1.jpg',
        'esp20.jpg'
      ],
      alt: 'home',
      album: 'INSTITUCIONAL',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fellus.jpg?alt=media&token=3ca610ad-502c-4165-9473-5d91b6fe6710'
    },
    {
      photoTitle: [
        'dj1.jpeg',
        'ensaio5.jpg',
        'dj1.jpeg',
        'dj9.jpeg',
        'djcutout.jpeg',
        'eyes1.jpeg',
        'catalogo1.jpg',
        'mag3.jpeg',
        'ensaio7.jpg',
        'lora7.jpg',
        'judo1.jpeg',
        'mag1.jpeg',
        'praianas3.jpeg',
        'off7.jpg',
        'ugo1.jpg',
        'ugo2.jpg',
        'voice2.jpeg',
        'pri2.jpeg',
        'pri1.jpeg'
      ],
      alt: 'home',
      album: 'ESTÚDIO',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fpri2.jpeg?alt=media&token=da48cd9b-fb9b-4dab-afe3-c3aff60e3e21'
    },
    {
      photoTitle: ['fani1.jpeg', 'quem1.jpeg'],
      alt: 'home',
      album: 'PUBLICAÇÕES',
      src: 'https://static1.purepeople.com.br/articles/1/16/76/1/@/145802-daniela-mercury-580x0-1.jpg'
    }
  ];

  return (
    <div className='py-20'>
      <div className='pb-10 items-center flex justify-center w-full'>
        <p>PORTIFOLIO</p>
      </div>
      {/* {showSession ? ( */}
      <div className='space-y-7 md:space-y-0 gap-10 md:grid-cols-4 md:grid'>
        {photosession.map(({ photoTitle, alt, album, src }) => {
          return (
            <SessionCard
              keyPass={false}
              onClick={() => {
                navigate('/photography/portifolio', { state: { photoTitle, album } });
              }}
              alt={alt}
              title={album}
              src={src}
            />
          );
        })}
      </div>
    </div>
  );
};
