import { useSelector } from 'react-redux';
import { RootState } from '../../store/stores';
import { signOut, updateProfile } from 'firebase/auth';
import { userAuth } from '../../../firebase';

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../login/slices/loginSlices';
import { Confirmation } from '../../components/modals/confirmation/Confirmation';
import { useState } from 'react';
import { Input } from '../../components/input/input';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ImageUpload from '../../components/importInput/ImportInput';
import { Footer } from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';

export const ProfileUser = () => {
  const pro = useSelector((state: RootState) => state.profile);
  const [closeCofirmation, setCloseConfirmation] = useState(true);
  const [editPRofile, setEditProfile] = useState(false);
  const [updateData, setUpdateData] = useState(pro);
  const [showEditPhoto, setShowEditPhoto] = useState(false);

  const dispatch = useDispatch();

  const uploadImage = async (file: Blob | Uint8Array | ArrayBuffer) => {
    const imageRef = ref(storage, `profile-images/${file.name}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };
  const handleImageSelect = async (image: File) => {
    const uploadURL = await uploadImage(image);
    await updateUserImgProfile(uploadURL);
  };

  const storage = getStorage();

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
      setEditProfile(false);
    } else {
      console.error('Erro ao atualizar o perfil do usuário.');
    }
  };

  const userUpdate = async (updateData: {
    email: string;
    displayName: string;
    photoURL: string;
  }) => {
    const currentUser = userAuth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, updateData);
        dispatch(
          updateUserProfile({
            displayName: updateData.displayName,
            photoURL: updateData.photoURL,
            email: updateData.email
          })
        );
        console.log('Successfully updated user profile');
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    } else {
      console.error('No user signed in. Update cannot proceed.');
    }
  };

  const logout = () => {
    signOut(userAuth)
      .then(() => {
        setCloseConfirmation(true);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdit = () => {
    setEditProfile(true);
  };

  const saveChanges = () => {
    userUpdate(updateData);
  };

  return (
    <section className='bg-black flex flex-col h-screen justify-between py-10 pb-40'>
      <Confirmation
        onConfirm={logout}
        onCancel={() => setCloseConfirmation(true)}
        hidden={closeCofirmation}
      />
      <div className='flex flex-col items-center px-20 w-fit'>
        <div className=' w-40 h-40 rounded-full items-end justify-start flex'>
          <div
            onMouseEnter={() => setShowEditPhoto(true)}
            onMouseLeave={() => setShowEditPhoto(false)}
            className={`${
              showEditPhoto && !editPRofile ? '' : 'hidden'
            } absolute w-fit border border-gray-700 p-1 rounded-md`}
          >
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>
          <img
            onMouseEnter={() => setShowEditPhoto(true)}
            onMouseLeave={() => setShowEditPhoto(false)}
            className='rounded-full w-40 h-40'
            src={pro.photoURL}
            alt='user'
          />
        </div>
        <div className='text-white w-52 gap-2 items-center flex flex-col justify-center space-y-3 py-2'>
          <Input
            onChange={(e) => setUpdateData({ ...updateData, displayName: e.target.value })}
            readOnly={!editPRofile}
            value={!editPRofile ? pro.displayName : updateData.displayName}
            type='text'
            label='nome:'
          />
          <div className={` ${editPRofile ? '' : 'hidden'} space-y-3  `}>
            <Input
              onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              readOnly={!editPRofile}
              value={!editPRofile ? pro.email : updateData.email}
              type='text'
              label='email'
            />
            <Input
              onChange={(e) => setUpdateData({ ...updateData, phoneNumber: e.target.value })}
              readOnly={!editPRofile}
              value={!editPRofile ? pro.phoneNumber : updateData.phoneNumber}
              type='text'
              label='fone:'
            />
            <div className='flex flex-col py-4'>
              <button
                onClick={saveChanges}
                className='bg-emerald-700 text-white text-xs p-1 rounded-md font-bold'
              >
                Salvar
              </button>
              <button
                onClick={() => setEditProfile(false)}
                className=' underline text-white text-xs p-1 rounded-md'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <div className='py-10 text-sm cursor-pointer flex items-start flex-col w-full'>
          <p onClick={onEdit} className={`text-gray-200 ${editPRofile && 'hidden'}`}>
            Editar
          </p>
          <p onClick={() => setCloseConfirmation(false)} className='text-red-500 cursor-pointer'>
            Sair
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
};
