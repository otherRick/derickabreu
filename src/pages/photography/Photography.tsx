import { useEffect, useState } from 'react';
import { downloadMedia } from '../../api/repository/downloadmedia';
import { CaretLeft, CaretRight, Info, X } from '@phosphor-icons/react';
import { Footer } from '../../components/footer/Footer';

export const Photography = () => {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const [fullImage, setFullImage] = useState<string[] | null>(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesToDownload = [
          'mag2.jpeg',
          'clareou2.jpg',
          'dj1.jpeg',
          'decor1.jpg',
          'decor2.jpg',
          'ensaio10.jpg',
          'ensaio5.jpg',
          'festa4.jpg',
          'festa7.jpg',
          'infantil2.jpg',
          'infantil12.jpg',
          'infantil15.jpg',
          'bolofesta.jpg',
          'aniver7.JPG',
          'ellus.jpg',
          'barcas.jpg',
          'djdjondjon.jpg',
          'clareou1.jpg',
          'buda1.jpeg',
          'danca1.jpeg',
          'danca2.jpg',
          'dj1.jpeg',
          'dj9.jpeg',
          'djcutout.jpeg',
          'eyes1.jpeg',
          'fani1.jpeg',
          'esp13.jpg',
          'esp14.jpg',
          // 'esp15.jpg',
          'esp16.jpg',
          'esp19.jpg',
          // sessão em pé
          'quem1.jpeg',
          'anav1.jpeg',
          'eyes2.jpeg',
          'drink2.jpeg',
          'drink1.jpeg',
          // 'esp18.jpg',
          'catalogo1.jpg',
          'infantil11.jpg',
          'mag3.jpeg',
          'drink7.jpg',
          'ensaio7.jpg',
          'esp2.jpg',
          'esp1.jpg',
          'lora7.jpg',
          'judo1.jpeg',
          'mag1.jpeg',
          // sessão em pé
          // 'esp20.jpg',
          'esp17.jpg',
          'esp3.jpg',
          'esp8.jpg',
          'idoso1.JPG',
          'idoso2.JPG',
          'espkid1.JPG',
          'jp1.jpg',
          'jp2.jpg',
          'jp3.jpg',
          'jp4.jpg',
          'jp5.jpg',
          'jp6.jpg',
          'kids2.JPG',
          'kids3.JPG',
          'kids4.JPG',
          'kids5.JPG',
          'kids6.JPG',
          'kids7.JPG',
          'kids8.JPG',
          'lau1.jpg',
          'matheus1.jpg',
          'infantil13.jpg',
          'intantil14.jpg',
          // 'newborn1.jpg',
          // 'newborn2.jpg',
          // 'newborn3.jpg',
          // 'newborn4.jpg',
          'paIpanema.jpg',
          // 'self2.jpg',
          // 'self6.jpg',
          // 'self4.JPG',
          // 'off1.jpg',
          // 'off2.jpg',
          'self3.jpg',
          // sessão media
          'praianas3.jpeg',
          'off7.jpg',
          'off3.jpg',
          'off4.jpg',
          'festa1.jpeg',
          // sessão media
          'off5.jpg',
          // 'offju1.JPG',
          // 'offju2.JPG',
          'shows2.jpg',
          'shows3.jpg',
          'trem1.jpg',
          'ugo1.jpg',
          'ugo2.jpg',
          'ugopalco.jpg',
          'voice2.jpeg',
          'pri2.jpeg',
          'prof1.jpeg',
          'prof2.jpeg',
          'produto1.jpg',
          'pa3.jpg',
          'pri1.jpeg',
          'mumu1.jpeg',
          'thi1.jpeg'
        ];
        const urls = await downloadMedia(filesToDownload);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='relative'>
      <div>
        {imageUrls ? (
          <div className='image-grid'>
            {imageUrls.map((url, index) => (
              <img
                onClick={() => {
                  setFullImage(url);
                  setSelectedImage(true);
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
        onClick={() => setSelectedImage(false)}
        style={{ backgroundColor: ' rgba(0, 0, 0, 0.7)' }}
        className={`${
          selectedImage ? '' : 'hidden'
        } fixed top-0 left-0 h-screen w-screen bg-black z-100 items-center justify-center flex`}
      >
        <X className='opacity-70 fixed top-16 right-16' color='white' weight='fill' size={32} />
        {/* <CaretLeft color='white' weight='fill' size={32} /> */}
        <div className='bg-white md:w-2/3 p-2 h-fit items-center justify-center flex'>
          {/* <Info
            onMouseEnter={() => {
              setMouseEnter(true);
            }}
            onMouseLeave={() => {
              setMouseEnter(false);
            }}
            className='fixed top-16 left-16 hidden md:block'
            color='white'
            weight='fill'
            size={32}
          /> */}
          <img src={fullImage} alt={`Downloaded Media ${'fullImage'}`} width={'100%'} />
          {/* <div
            style={{ backgroundColor: ' rgba(800, 800, 800, 0.8)' }}
            className={`p-8 h-fit w-64 absolute left-0 transition-transform duration-300 ease-in-out ${
              mouseEnter ? 'translate-x-0 left-20' : '-translate-x-full '
            }`}
          >
            <p className='text-md text-gray-700'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum commodi ipsum fuga ex
              vero beatae fugit repudiandae, ut ab expedita pariatur reiciendis consequuntur, atque
              exercitationem minus, quis quas dicta distinctio.
            </p>
          </div> */}
        </div>
        {/* <CaretRight color='white' weight='fill' size={32} /> */}
      </div>
      <Footer black />
    </div>
  );
};
