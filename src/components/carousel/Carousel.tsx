import { useEffect, useState } from 'react';
import { photoOrientation } from '../../utils/photoOrientation';
import { ModalBG } from './components/ModalBG';
import { Framer } from './components/Framer';
import { Selector } from './components/Selectors';
import { CloseModal } from './components/CloseModal';
import { DownloadBtn } from './components/DownloadBtn';
import { CartBtn } from './components/CartBtn';
import { CarouselProps } from './helpers/CarouselProps';
import { ShoppingCartSimple } from '@phosphor-icons/react';

export const Carousel = ({
  selectedImage,
  src,
  imageUrls,
  onBuyItemClick,
  foundAlbum,
  downloadImage,
  onClose,
  alt,
  payToview
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [landscape, setLandscape] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = ''; // Enable scroll
    }

    return () => {
      document.body.style.overflow = ''; // Ensure scroll is re-enabled when unmounting
    };
  }, [selectedImage]);

  useEffect(() => {
    photoOrientation(src as string, (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage(src as string);
  }, [src]);

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
    <ModalBG selectedImage={selectedImage}>
      <div
        className={` ${
          !payToview && 'hidden'
        } absolute text-zinc-200 top-0 w-full py-4 px-10 flex items-end justify-end`}
      >
        <ShoppingCartSimple weight='bold' className='text-3xl' />
      </div>
      <Framer landscape={landscape}>
        <Selector nextImage={nextImage} prevImage={prevImage} />
        <div>
          <img src={currentImage} alt={alt} />
          <div className='z-50 w-full  flex items-center justify-between p-2'>
            <CloseModal onClick={onClose} />
            <CartBtn foundAlbum={foundAlbum} onClick={onBuyItemClick} />
            <DownloadBtn foundAlbum={foundAlbum} onClick={downloadImage} />
          </div>
        </div>
      </Framer>
    </ModalBG>
  );
};
