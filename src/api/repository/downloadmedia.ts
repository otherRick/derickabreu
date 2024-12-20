import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { bucket } from '../database';

export const downloadMedia = async (files: string[] | string) => {
  try {
    const filesArray = Array.isArray(files) ? files : [files];

    const downloadURLs = await Promise.all(
      filesArray.map(async (file) => {
        const fileRef = ref(bucket, `best/${file}`);
        return await getDownloadURL(fileRef);
      })
    );

    return downloadURLs;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const downloadAllPublicAlbuns = async (album: string) => {
  try {
    const storage = getStorage();
    const directoryRef = ref(storage, `/${album}`); // Referência à pasta "best"

    // Lista todos os arquivos na pasta "best"
    const result = await listAll(directoryRef);

    // Para cada item, obtemos o URL de download
    const downloadURLs = await Promise.all(
      result.items.map(async (itemRef) => {
        return await getDownloadURL(itemRef);
      })
    );

    return downloadURLs;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const homeMedia = async (files: string[] | string) => {
  try {
    const filesArray = Array.isArray(files) ? files : [files];

    const downloadURLs = await Promise.all(
      filesArray.map(async (file) => {
        const fileRef = ref(bucket, `homefotos/${file}`);
        return await getDownloadURL(fileRef);
      })
    );

    return downloadURLs;
  } catch (error) {
    console.error(error);
    return null;
  }
};
