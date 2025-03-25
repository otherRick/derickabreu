import { SetStateAction, useState } from 'react';
import { downloadAllPublicAlbuns, ImageFileProps } from '../../../../api/repository/downloadmedia';
import { useLocation, useNavigate } from 'react-router-dom';
import { photosession } from '../../helpers/photosession';
import { Carousel } from '../../../../components/carousel/Carousel';
import { useFetchAlbumImages } from '../../../../hooks/useFetchAlbumImg';
import { FormModalKey } from '../../../../components/modals/formModal/FormModalKey';
import { downloadIgm } from '../../utils/downloadImg';
import { ScrollToTopButton } from '../../../../components/scrollToTopButton/ScrollToTopButton';
import { AlbumWrap } from '../privateAlbumBlank/AlbumWrap';

export const PublicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFileProps>();
  const [openCarousel, setOpenCarousel] = useState(false);
  const [albumKey, setAlbumKey] = useState('');
  const [erroMessage, setErrorMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { keyPass, alt, payToview } = location.state || {};

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  const thereis = photosession.find((item) => item.alt === albumKey);

  const albumName = foundAlbum?.album ? foundAlbum?.album : thereis?.album;

  const { allImgData, openModal, setOpenModal, setAllImgData } = useFetchAlbumImages({
    keyPass,
    alt,
    albumName
  });

  const handleEnterKey = async () => {
    if (albumKey === foundAlbum?.alt || thereis) {
      try {
        const files = await downloadAllPublicAlbuns(albumKey);
        setAllImgData(files as SetStateAction<[]>);
        setOpenModal(false);
      } catch (error) {
        setAlbumKey('');
        setErrorMessage('Erro ao buscar chave');
        console.error('Error fetching media:', error);
        setOpenModal(true);
      }
    } else {
      setAlbumKey('');
      setErrorMessage('chave incorreta');
      setOpenModal(true);
    }
  };

  return (
    <AlbumWrap
      payToview={payToview}
      downloadFolderLink={{
        alta: thereis?.folderLink.high,
        media: thereis?.folderLink.medium,
        baixa: thereis?.folderLink.low
      }}
      album={albumName}
    >
      <div className='relative'>
        <FormModalKey
          placeholder={erroMessage}
          onFocus={() => {
            setAlbumKey(''), setErrorMessage('');
          }}
          albumKey={albumKey}
          name={foundAlbum?.album}
          onChange={(e) => setAlbumKey(e)}
          onClose={() => {
            setOpenModal(false);
            navigate('/photography');
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
    </AlbumWrap>
  );
};
