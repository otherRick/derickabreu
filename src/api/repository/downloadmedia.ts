import { getDownloadURL, ref } from 'firebase/storage';
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
