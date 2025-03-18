import { useEffect, useState } from 'react';
import { photoOrientation } from '../../utils/photoOrientation';
import { CaretLeft, CaretRight, ShoppingCartSimple, X } from '@phosphor-icons/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { photosession } from '../../pages/photography/helpers/photosession';

interface CarouselProps {
  selectedImage: boolean;
  src: string | URL | Request | undefined | Promise<Response>;
  imageUrls: string[];
  onBuyItemClick: () => void;
  foundAlbum: (typeof photosession)[number] | undefined;
  downloadImage: () => void;
  onClose: () => void;
  alt: string;
}

export const Carousel = ({
  selectedImage,
  src,
  imageUrls,
  onBuyItemClick,
  foundAlbum,
  downloadImage,
  onClose,
  alt
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [landscape, setLandscape] = useState(false);
  useEffect(() => {
    photoOrientation(src as string, (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage(src as string);
  }, [src]);

  console.log(currentImage);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls?.length);
    photoOrientation(imageUrls[currentIndex], (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage(imageUrls[currentIndex]);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    photoOrientation(imageUrls[currentIndex], (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage(imageUrls[currentIndex]);
  };

  return (
    <div
      style={{ backgroundColor: ' rgba(0, 0, 0, 0.7)' }}
      className={`${
        selectedImage ? '' : 'hidden'
      } fixed top-0 left-0 h-screen w-screen bg-black z-100 items-center justify-evenly flex`}
    >
      <div
        className={`bg-white md:w-2/3 p-2 h-fit items-center flex relative ${
          landscape ? ' md:max-w-[1000px] w-96' : ' md:max-w-[500px] w-10/12'
        }`}
      >
        <div
          onClick={prevImage}
          className='h-40 flex items-center absolute opacity-40 left-5 md:-left-40'
        >
          <div className='bg-black text-white rounded-full p-2 text-xl md:text-6xl font-bold'>
            <CaretLeft />
          </div>
        </div>
        <div>
          <img src={currentImage} alt={alt} />
          <div className='z-50 w-full  flex items-center justify-between p-2'>
            <div
              onClick={onBuyItemClick}
              style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
              className={` ${
                !foundAlbum?.payToview && 'hidden'
              } flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
            >
              <ShoppingCartSimple className='' />
              <p>Comprar</p>
            </div>
            <div
              onClick={downloadImage}
              style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
              className={` ${
                foundAlbum?.payToview && 'hidden'
              } flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
            >
              <ArrowDownTrayIcon className='w-8  hover:text-zinc-800' />
            </div>

            <div
              onClick={onClose}
              style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
              className='flex items-center p-1 gap-2 text-white opacity-70 top-16 md:right-16 right-4 rounded-xl'
            >
              <X className=' hover:text-zinc-800' size={32} />
            </div>
          </div>
        </div>
        <div
          onClick={nextImage}
          className='h-40 flex items-center absolute opacity-40 right-5 md:-right-40'
        >
          <div className='bg-black text-white rounded-full p-2 text-xl md:text-6xl font-bold'>
            <CaretRight />
          </div>
        </div>
      </div>
    </div>
  );
};
