import { useState, useEffect } from 'react';
import { photosession } from '../pages/photography/helpers/photosession';
import { downloadAllPublicAlbuns } from '../api/repository/downloadmedia';

interface UseFetchAlbumImagesProps {
  keyPass: string;
  alt: string;
  albumName: string | undefined;
}

export const useFetchAlbumImages = ({ keyPass, alt, albumName }: UseFetchAlbumImagesProps) => {
  const [allImgData, setAllImgData] = useState<[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const foundAlbum = photosession.find((item) => item.album === albumName);

    const fetchData = async (passKey: string) => {
      try {
        const allImgData = await downloadAllPublicAlbuns(passKey);

        setAllImgData(allImgData as []);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    if (keyPass === '' && !foundAlbum?.locked) {
      fetchData(alt);
    } else if (keyPass === '' && foundAlbum?.locked) {
      setOpenModal(true);
    } else if (keyPass) {
      fetchData(keyPass);
    } else {
      setOpenModal(true);
    }
  }, [keyPass, alt, albumName]);

  return { allImgData, openModal, setOpenModal, setAllImgData };
};
