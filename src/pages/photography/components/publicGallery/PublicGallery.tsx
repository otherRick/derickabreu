import { SetStateAction, useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';

import { LoginSMS } from '../../../login/loginSMS';
import { downloadAllPublicAlbuns } from '../../../../api/repository/downloadmedia';
import { useLocation, useNavigate } from 'react-router-dom';
import { photosession } from '../../helpers/photosession';
import { Carousel } from '../../../../components/carousel/Carousel';

export const PublicGallery = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fullImage, setFullImage] = useState<Promise<Response> | string | URL | Request>();
  const [selectedImage, setSelectedImage] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [imageId, setImageId] = useState('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [albumKey, setAlbumKey] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { keyPass, alt } = location.state || {};

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  useEffect(() => {
    if (keyPass === '' && !foundAlbum?.locked) {
      const fetchData = async () => {
        try {
          const urls = await downloadAllPublicAlbuns(alt);
          setImageUrls(urls as SetStateAction<string[]>);
        } catch (error) {
          console.error('Error fetching media:', error);
        }
      };

      fetchData();
    } else if (keyPass === '' && foundAlbum?.locked) {
      setOpenModal(true);
    } else {
      setOpenModal(true);
    }
  }, []);

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

  const getImgId = (url: string) => {
    const filenameWithParams = url.substring(url.lastIndexOf('/') + 1);

    const filename = filenameWithParams.split('?')[0];

    setImageId(filename.slice(7).split('.')[0]);
  };

  const decoded = decodeURIComponent(imageId);
  const cleanName = decoded.replace(/^os\//, '');

  const downloadImage = async () => {
    try {
      const response = await fetch(fullImage as string);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = cleanName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleSendWhatsapp = () => {
    const numeroTelefone = '5521973621887';
    const extractFileName = () => {
      const urlObj = new URL(fullImage as URL);
      const pathname = urlObj.pathname;
      const fileName = pathname.split('/').pop();
      return fileName || '';
    };

    const mensagem = `Gostaria de comprar esta imagem:%0A${extractFileName()}`;
    const link = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

    window.open(link, '_blank');
  };

  return (
    <div className='relative'>
      <LoginSMS open={openLogin} closeLogin={() => setOpenLogin(false)} />
      <Modal
        onClose={() => {
          setOpenModal(false), navigate('/photography');
        }}
        show={openModal}
      >
        <Modal.Header>{foundAlbum?.album}</Modal.Header>
        <Modal.Body>
          <div className='flex flex-col'>
            <p>Enter Key</p>
            <input value={albumKey} onChange={(e) => setAlbumKey(e.target.value)} type='text' />
            <Button onClick={handleEnterKey}>Entrar</Button>
            <a className='underline' href='/photography'>
              fechar
            </a>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        {imageUrls?.length !== 0 ? (
          <div className='columns-2 md:columns-6 gap-4 space-y-4 p-4 '>
            {imageUrls?.map((url, index) => (
              <img
                onClick={() => {
                  setFullImage(url);
                  setSelectedImage(true);
                  getImgId(url);
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
      <Carousel
        downloadImage={downloadImage}
        foundAlbum={foundAlbum}
        imageUrls={imageUrls}
        onBuyItemClick={handleSendWhatsapp}
        onClose={() => {
          setSelectedImage(false);
        }}
        selectedImage={selectedImage}
        src={fullImage}
        alt={`Downloaded Media ${'fullImage'}`}
      />
    </div>
  );
};
