import { SetStateAction, useState } from 'react';

import { LoginSMS } from '../../../login/loginSMS';
import { downloadAllPublicAlbuns } from '../../../../api/repository/downloadmedia';
import { useLocation, useNavigate } from 'react-router-dom';
import { photosession } from '../../helpers/photosession';
import { Carousel } from '../../../../components/carousel/Carousel';
import { useFetchAlbumImages } from '../../../../hooks/useFetchAlbumImg';
import { whatsappSander } from '../../../../utils/whatsappSender';
import { FormModalKey } from '../../../../components/modals/formModal/FormModalKey';
import { downloadIgm } from '../../utils/downloadImg';
import { ScrollToTopButton } from '../../../../components/scrollToTopButton/ScrollToTopButton';
import { extractFileName } from '../../../../utils/extractFileName';

export const PublicGallery = () => {
  const [fullImage, setFullImage] = useState<Promise<Response> | string | URL | Request>();
  const [openCarousel, setOpenCarousel] = useState(false);
  const [fileName, setFileName] = useState('');
  const [openLogin, setOpenLogin] = useState(false);
  const [albumKey, setAlbumKey] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { keyPass, alt, payToview } = location.state || {};

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  const albumName = foundAlbum?.album;

  const { imageUrls, openModal, setOpenModal, setImageUrls } = useFetchAlbumImages({
    keyPass,
    alt,
    albumName
  });

  const handleEnterKey = async () => {
    try {
      const urls = await downloadAllPublicAlbuns(albumKey);
      setImageUrls(urls as SetStateAction<string[]>);
      if (albumKey === foundAlbum?.keyPass) {
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  return (
    <div className='relative'>
      <LoginSMS open={openLogin} closeLogin={() => setOpenLogin(false)} />

      <FormModalKey
        albumKey={albumKey}
        name={foundAlbum?.album}
        onChange={(e) => setAlbumKey(e)}
        onClose={() => {
          setOpenModal(false), navigate('/photography');
        }}
        onConfirm={handleEnterKey}
        openModal={openModal}
      />

      <div>
        {imageUrls?.length !== 0 ? (
          <div className='columns-2 md:columns-6 gap-4 space-y-4 p-4 '>
            {imageUrls?.map((url, index) => (
              <img
                onClick={() => {
                  setFullImage(url);
                  setOpenCarousel(true);
                  setFileName(extractFileName(url));
                }}
                src={url}
                className='w-full rounded-lg break-inside-avoid'
                alt={`Downloaded Media ${index}`}
                width={'100%'}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ScrollToTopButton />
      <Carousel
        downloadImage={() => downloadIgm(fullImage as string)}
        foundAlbum={foundAlbum}
        imageUrls={imageUrls}
        onBuyItemClick={() => whatsappSander(fileName)}
        onClose={() => {
          setOpenCarousel(false);
        }}
        selectedImage={{ url: fullImage, alt: `Downloaded Media ${'fullImage'}`, name: fileName }}
        open={openCarousel}
        payToview={payToview}
      />
    </div>
  );
};
