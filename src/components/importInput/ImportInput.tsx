import { getDownloadURL, getStorage, ref, uploadBytes } from '@firebase/storage';
import { PencilSimple } from '@phosphor-icons/react';
import { ChangeEvent } from 'react';
import { userAuth } from '../../../firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../pages/login/slices/loginSlices';

const ImageUpload = ({ setEditProfile }: { setEditProfile: () => void }) => {
  const storage = getStorage(); // Invoke getStorage to get the storage instance
  const dispatch = useDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const uploadImage = async (file: Blob | Uint8Array | ArrayBuffer) => {
    const imageRef = ref(storage, `profile-images/${file.name}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };
  const onImageSelect = async (image: File) => {
    const uploadURL = await uploadImage(image);
    await updateUserImgProfile(uploadURL);
  };

  const updateUserImgProfile = async (downloadURL: string) => {
    const user = userAuth.currentUser;
    if (user) {
      await updateProfile(user, {
        photoURL: downloadURL
      });
      dispatch(
        updateUserProfile({
          photoURL: downloadURL
        })
      );
      setEditProfile();
    } else {
      console.error('Erro ao atualizar o perfil do usuário.');
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id='image-upload'
      />
      <label htmlFor='image-upload'>
        <div className='flex text-white gap-1 items-center rounded-md text-xs'>
          <PencilSimple size={16} />
          <p>Editar</p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
