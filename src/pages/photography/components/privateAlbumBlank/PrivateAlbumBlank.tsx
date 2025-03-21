import { useLocation, useNavigate } from 'react-router-dom';
import { PublicGallery } from '../publicGallery/PublicGallery';
// import { FolderArrowDownIcon } from '@heroicons/react/24/outline';
import JSZip from 'jszip';
import { downloadAllPublicAlbuns } from '../../../../api/repository/downloadmedia';
import { useEffect, useState } from 'react';
import { photosession } from '../../helpers/photosession';
import { FolderArrowDownIcon } from '@heroicons/react/24/outline';
import { CartDropdown } from '../../../../components/dropdowns/CartDropdown';

export const PrivateAlbumBlank = () => {
  const [imageUrls, setImageUrls] = useState<[string]>(['']);
  const navigate = useNavigate();
  const location = useLocation();

  const { album, payToview } = location.state || {};

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = await downloadAllPublicAlbuns('');
        setImageUrls(urls);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    };

    fetchData();
  }, []);

  const downloadImagesAsZip = async (imageUrls) => {
    try {
      const zip = new JSZip();

      await Promise.all(
        imageUrls.map(async (url, index) => {
          const response = await fetch(url);
          const blob = await response.blob();
          const fileName = `imagem_${index + 1}.jpg`; // Nome padrão para cada imagem
          zip.file(fileName, blob);
        })
      );

      // Gera o arquivo ZIP
      const content = await zip.generateAsync({ type: 'blob' });

      // Cria um link temporário para o download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = 'imagens.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar imagens:', error);
    }
  };

  return (
    <div className='w-full'>
      <div className='bg-zinc-100 py-10 flex justify-center'>
        <div className='items-center flex w-1/3 justify-center'>
          <button className='underline' onClick={() => navigate(-1)}>
            voltar
          </button>
        </div>
        <div className='items-center flex w-1/3 justify-center'>
          <p>{album ? album : foundAlbum?.album}</p>
        </div>
        <div className={`items-center flex w-1/3 justify-center flex-col`}>
          {payToview ? (
            <div>
              {/* <ShoppingCart
                onClick={() => downloadImagesAsZip(imageUrls)}
                size={20}
                weight='bold'
                className=' text-zinc-400 hover:text-zinc-800 w-10 h-10 p-2 cursor-pointer'
              /> */}
              <CartDropdown album={foundAlbum} />
            </div>
          ) : (
            <FolderArrowDownIcon
              onClick={() => downloadImagesAsZip(imageUrls)}
              className=' text-zinc-400 hover:text-zinc-800  w-10 h-10 p-2 cursor-pointer'
            />
          )}
        </div>
      </div>
      <PublicGallery />
    </div>
  );
};
