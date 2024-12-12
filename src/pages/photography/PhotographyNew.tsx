import { useState } from 'react';
import { SessionCard } from './components/sessionCard/SessionCard';
import { Photography } from './Photography';

export const PhotographyNew = () => {
  const [showSession, setShowSession] = useState(false);
  const photosession = [
    {
      to: '/home',
      alt: 'DOCUMENTAL',
      title: 'DOCUMENTAL',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fbarro.jpg?alt=media&token=4acac59e-7b7f-4b09-aa2e-0f9d39920752'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'INFÂNCIA',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Finfantil15.jpg?alt=media&token=eccfa75b-77a7-4c61-8f78-f94f484dc3a1'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'CELEBRAÇÕES',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fesp3.jpg?alt=media&token=764e28ff-0ee3-43fb-9ae4-a4108cd9aa89'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'GESTANTES',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fmag2.jpeg?alt=media&token=31b65b4c-ea16-4411-a3e7-46410df162aa'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'PALCO',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fmumu1.jpeg?alt=media&token=a049689d-e9bd-4d3b-b093-61193bde338d'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'INSTITUCIONAL',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fellus.jpg?alt=media&token=3ca610ad-502c-4165-9473-5d91b6fe6710'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'ESTÚDIO',
      src: 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/best%2Fpri2.jpeg?alt=media&token=da48cd9b-fb9b-4dab-afe3-c3aff60e3e21'
    },
    {
      to: '/home',
      alt: 'home',
      title: 'PUBLICAÇÕES',
      src: 'https://static1.purepeople.com.br/articles/1/16/76/1/@/145802-daniela-mercury-580x0-1.jpg'
    }
  ];
  return (
    <div className='py-20'>
      {showSession ? (
        <div className='space-y-7 md:space-y-0 gap-10 md:grid-cols-4 md:grid'>
          {photosession.map(({ to, alt, title, src }) => {
            return <SessionCard to={to} alt={alt} title={title} src={src} />;
          })}
        </div>
      ) : (
        <div>
          <Photography />
        </div>
      )}
    </div>
  );
};
