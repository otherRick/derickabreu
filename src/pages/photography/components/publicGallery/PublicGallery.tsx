import { SetStateAction, useState } from 'react';

import { LoginSMS } from '../../../login/loginSMS';
import { downloadAllPublicAlbuns, ImageFileProps } from '../../../../api/repository/downloadmedia';
import { useLocation, useNavigate } from 'react-router-dom';
import { photosession } from '../../helpers/photosession';
import { Carousel } from '../../../../components/carousel/Carousel';
import { useFetchAlbumImages } from '../../../../hooks/useFetchAlbumImg';
import { FormModalKey } from '../../../../components/modals/formModal/FormModalKey';
import { downloadIgm } from '../../utils/downloadImg';
import { ScrollToTopButton } from '../../../../components/scrollToTopButton/ScrollToTopButton';

export const PublicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFileProps>();
  const [openCarousel, setOpenCarousel] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [albumKey, setAlbumKey] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { keyPass, alt, payToview } = location.state || {};

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  const albumName = foundAlbum?.album;

  const { allImgData, openModal, setOpenModal, setAllImgData } = useFetchAlbumImages({
    keyPass,
    alt,
    albumName
  });

  console.log(albumKey, foundAlbum?.alt);

  const handleEnterKey = async () => {
    if (decodedAlbumName === foundAlbum?.alt) {
      try {
        const files = await downloadAllPublicAlbuns(albumKey);
        setAllImgData(files as SetStateAction<[]>);
        setOpenModal(false);
      } catch (error) {
        console.error('Error fetching media:', error);
        setOpenModal(false), navigate('/photography');
      }
    } else {
      setOpenModal(false), navigate('/photography');
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
        {allImgData?.length !== 0 ? (
          <div className='columns-2 md:columns-6 gap-4 space-y-4 p-4 '>
            {allImgData?.map((file: ImageFileProps, index: number) => (
              <img
                onClick={() => {
                  setSelectedImage(file);
                  setOpenCarousel(true);
                }}
                src={file.url}
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
        downloadImage={() => downloadIgm(selectedImage?.url as string)}
        foundAlbum={foundAlbum}
        allImgData={allImgData}
        onClose={() => {
          setOpenCarousel(false);
        }}
        selectedImage={selectedImage}
        open={openCarousel}
        payToview={payToview}
      />
    </div>
  );
};
