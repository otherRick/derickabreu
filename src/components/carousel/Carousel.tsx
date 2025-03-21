import { useEffect, useState } from 'react';
import { photoOrientation } from '../../utils/photoOrientation';
import { ModalBG } from './components/ModalBG';
import { Framer } from './components/Framer';
import { Selector } from './components/Selectors';
import { CloseModal } from './components/CloseModal';
import { DownloadBtn } from './components/DownloadBtn';
import { CartBtn } from './components/CartBtn';
import { CarouselProps } from './helpers/CarouselProps';
import { CartHeader } from './components/CartHeader';
import { ImageFileProps } from '../../api/repository/downloadmedia';

export const Carousel = ({
  open,
  selectedImage,
  allImgData,
  foundAlbum,
  downloadImage,
  onClose,
  payToview
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<ImageFileProps>();
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
    photoOrientation(selectedImage?.url as string, (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage({ url: selectedImage?.url as string, name: selectedImage?.name as string });
  }, [selectedImage?.name, selectedImage?.url]);
  const nextImage = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % allImgData.length;
      updateImage(newIndex);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + allImgData.length) % allImgData.length;
      updateImage(newIndex);
      return newIndex;
    });
  };

  const updateImage = (index: number) => {
    const image = allImgData[index];
    photoOrientation(image.url, (isLandscape) => {
      setLandscape(isLandscape);
    });
    setCurrentImage({ url: image.url, name: image.name });
  };

  const unicPrice = 19.9;
  const personalPrice = '';
  const price = personalPrice ? personalPrice : unicPrice;

  return (
    <ModalBG show={open}>
      <CartHeader album={foundAlbum?.album} show={payToview} />
      <Framer landscape={landscape}>
        <Selector nextImage={nextImage} prevImage={prevImage} />
        <div>
          <img src={currentImage?.url} alt={currentImage?.name} />
          <div className='z-50 w-full  flex items-center justify-between p-2'>
            <CloseModal onClick={onClose} />
            <div>
              <p>{currentImage?.name}</p>
            </div>
            <CartBtn
              itemData={{ url: currentImage?.url, name: currentImage?.name, price }}
              foundAlbum={foundAlbum}
            />
            <DownloadBtn foundAlbum={foundAlbum} onClick={downloadImage} />
          </div>
        </div>
      </Framer>
    </ModalBG>
  );
};
