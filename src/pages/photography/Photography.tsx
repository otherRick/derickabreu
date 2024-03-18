import { useEffect, useState } from 'react';
import { downloadMedia } from '../../api/repository/downloadmedia';
import { Heart, X } from '@phosphor-icons/react';
import { Footer } from '../../components/footer/Footer';
import ReactGA from 'react-ga';
import { userAuth } from '../../../firebase';
import { LoginSMS } from '../login/loginSMS';
import { filesToDownload } from './helpers/filesToDownload';

export const Photography = () => {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [like, setLike] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [landscape, setLandscape] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = await downloadMedia(filesToDownload);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchData();
  }, []);

  const ga = () => {
    ReactGA.event({
      category: 'Cards',
      action: 'Clique no card',
      label: 'title' // Use o título do card como rótulo
    });
  };

  const onLike = () => {
    const unsubscribe = userAuth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setLike(!like);
        console.log('logged');

        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        console.log('not logged in');
        setOpenLogin(true);
      }
    });

    return () => {
      unsubscribe();
    };
  };

  const photoOrientation = (url: string) => {
    const img = new Image();
    img.onload = () => {
      const largura = img.width;
      const altura = img.height;

      if (largura > altura) {
        setLandscape(false);
      } else if (largura < altura) {
        setLandscape(true);
      } else {
        setLandscape(true);
      }
    };
    img.src = url;
  };

  return (
    <div className='relative'>
      <LoginSMS open={openLogin} closeLogin={() => setOpenLogin(false)} />
      <div>
        {imageUrls ? (
          <div className='image-grid'>
            {imageUrls.map((url, index) => (
              <img
                onClick={() => {
                  photoOrientation(url);
                  setFullImage(url);
                  setSelectedImage(true);
                  ga;
                }}
                key={index}
                src={url}
                alt={`Downloaded Media ${index}`}
                width={'100%'}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div
        style={{ backgroundColor: ' rgba(0, 0, 0, 0.7)' }}
        className={`${
          selectedImage ? '' : 'hidden'
        } fixed top-0 left-0 h-screen w-screen bg-black z-100 items-center justify-center flex`}
      >
        <X
          onClick={() => setSelectedImage(false)}
          className='opacity-70 fixed top-16 right-16'
          color='white'
          size={32}
        />

        <div
          className={`bg-white md:w-2/3 p-2 h-fit items-center justify-center flex flex-col ${
            !landscape ? ' max-w-[1200px]' : ' max-w-[550px]'
          }`}
        >
          <img src={fullImage?.toString()} alt={`Downloaded Media ${'fullImage'}`} />
          <div className='bg-white w-full flex items-center justify-between p-6'>
            <div className='flex gap-2 items-center w-fit '>
              <p>
                {'77'} <span className='text-xs'>visualizações</span>
              </p>
            </div>

            <div className='flex gap-2 items-center w-40 justify-end'>
              <p>5</p>
              <Heart
                onClick={onLike}
                size={20}
                color='red'
                weight={`${like ? 'fill' : 'light'}`}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer black />
    </div>
  );
};
