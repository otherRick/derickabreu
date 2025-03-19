import { useEffect, useState } from 'react';
import { photoOrientation } from '../../utils/photoOrientation';
import { ModalBG } from './components/ModalBG';
import { Framer } from './components/Framer';
import { Selector } from './components/Selectors';
import { CloseModal } from './components/CloseModal';
import { DownloadBtn } from './components/DownloadBtn';
import { CartBtn } from './components/CartBtn';
import { CarouselProps } from './helpers/CarouselProps';
import { CartHeader } from './components/cartHeader';

export const Carousel = ({
  open,
  selectedImage,
  imageUrls,
  onBuyItemClick,
  foundAlbum,
  downloadImage,
  onClose,
  payToview
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [landscape, setLandscape] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    photoOrientation(selectedImage.url as string, (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage(selectedImage.url as string);
  }, [selectedImage.url]);

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

  const price = 10.0;

  return (
    <ModalBG show={open}>
      <CartHeader show={payToview} />
      <Framer landscape={landscape}>
        <Selector nextImage={nextImage} prevImage={prevImage} />
        <div>
          <img src={currentImage} alt={selectedImage.alt} />
          <div className='z-50 w-full  flex items-center justify-between p-2'>
            <CloseModal onClick={onClose} />
            <div>
              <p>{selectedImage.name}</p>
              <p>{price}</p>
            </div>
            <CartBtn itemData={selectedImage} foundAlbum={foundAlbum} onClick={onBuyItemClick} />
            <DownloadBtn foundAlbum={foundAlbum} onClick={downloadImage} />
          </div>
        </div>
      </Framer>
    </ModalBG>
  );
};
