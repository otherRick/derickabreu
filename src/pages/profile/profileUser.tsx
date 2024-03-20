import { useSelector } from 'react-redux';
import { RootState } from '../../store/stores';
import { deleteUser, signOut, updateProfile } from 'firebase/auth';
import { userAuth } from '../../../firebase';

import { useDispatch } from 'react-redux';
import { ProfileState, updateUserProfile } from '../login/slices/loginSlices';
import { Confirmation } from '../../components/modals/confirmation/Confirmation';
import { SetStateAction, useEffect, useState } from 'react';
import { Input } from '../../components/input/input';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ImageUpload from '../../components/importInput/ImportInput';
import { Footer } from '../../components/footer/Footer';
import { ChooseLoginMethodModal } from '../../components/modals/chooseLoginMethodModal/ChooseLoginMethodModal';
import { User } from 'firebase/auth/web-extension';

export const ProfileUser = () => {
  const pro = useSelector((state: RootState) => state.profile);
  const [closeCofirmation, setCloseConfirmation] = useState(true);
  const [closeCofirmationDelete, setCloseConfirmationDele] = useState(true);
  const [editPRofile, setEditProfile] = useState(false);
  const [updateData, setUpdateData] = useState(pro);
  const [originalData, setOriginalData] = useState<SetStateAction<ProfileState>>(pro); //eu modifiquei, era um objeto vazio {}
  const [openLogin, setOpenLogin] = useState(false);
  const [showEditPhoto, setShowEditPhoto] = useState(false);

  useEffect(() => {
    setOriginalData(pro);
  }, [pro]);

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

    // const credential = EmailAuthProvider.credential(currentUser?.email || '', '');

    if (currentUser) {
      // reauthenticateWithCredential(currentUser, credential)
      //   .then(() => {
      //     return updateEmail(currentUser, updateData.email);
      //   })
      //   .then(() => {
      //     console.log('Email updated successfully!');
      //   })
      //   .catch((error) => {
      //     console.error('Error updating email:', error);
      //     // Handle other potential errors (e.g., invalid email format)
      //   });

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
    setUpdateData(pro);
  };

  const saveChanges = () => {
    userUpdate(updateData);
    setEditProfile(false);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 800);
  };
  const onCancelEdit = () => {
    setEditProfile(false);
    setUpdateData(originalData);
  };

  const delUser = () => {
    const user = userAuth.currentUser as User;

    deleteUser(user)
      .then(() => {
        setCloseConfirmation(true);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);

        // ...
      });
  };

  return (
    <section className='bg-black flex flex-col h-screen justify-between py-10 pb-40 w-full'>
      <Confirmation
        desire='DELETAR'
        onConfirm={delUser}
        onCancel={() => setCloseConfirmationDele(true)}
        hidden={closeCofirmationDelete}
      />
      <Confirmation
        desire='sair'
        onConfirm={logout}
        onCancel={() => setCloseConfirmation(true)}
        hidden={closeCofirmation}
      />
      <ChooseLoginMethodModal closeLogin={() => setOpenLogin(false)} openLogin={openLogin} />

      {userAuth.currentUser ? (
        <>
          <div className='  h-full justify-between flex flex-col items-center px-20 w-fit'>
            <div className=' flex flex-col items-center'>
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
                  src={
                    pro.photoURL
                      ? pro.photoURL
                      : 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/profile-images%2Fempty.jpeg?alt=media&token=6f348818-785b-4847-9d49-9445e735a589'
                  }
                  alt='user'
                />
              </div>
              <div className='text-white w-52 gap-2 items-center flex flex-col justify-center space-y-3 py-2'>
                <Input
                  onChange={(e) => setUpdateData({ ...updateData, displayName: e.target.value })}
                  readOnly={!editPRofile}
                  value={updateData.displayName === '' ? pro.displayName : updateData.displayName}
                  type='text'
                  label='nome:'
                />
                <Input
                  onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                  readOnly={!editPRofile}
                  value={updateData.email === '' ? pro.email : updateData.email}
                  type='text'
                  label='email'
                />
                <div className={` ${editPRofile ? '' : 'hidden'} space-y-3  `}>
                  <Input
                    onChange={(e) => setUpdateData({ ...updateData, phoneNumber: e.target.value })}
                    readOnly={!editPRofile}
                    value={
                      updateData.phoneNumber === '' ? pro.phoneNumber : updateData.phoneNumber
                    }
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
                      onClick={onCancelEdit}
                      className=' underline text-white text-xs p-1 rounded-md'
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='py-10 text-sm cursor-pointer flex items-start flex-col w-full'>
              <p onClick={onEdit} className={`text-gray-200 ${editPRofile && 'hidden'}`}>
                Editar
              </p>
              <p
                onClick={() => setCloseConfirmation(false)}
                className='text-red-500 cursor-pointer'
              >
                Sair
              </p>
              <p
                onClick={() => setCloseConfirmationDele(false)}
                className='text-red-500 cursor-pointer pt-10 text-xs'
              >
                Deletar
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col items-center justify-center px-10 h-full gap-40 '>
            <button className='bg-white p-2 rounded-md' onClick={() => setOpenLogin(true)}>
              Entrar
            </button>
            <p className='text-white text-xl text-center '>
              Logado com o seu perfil do cliente você terá <br className='hidden md:block' />{' '}
              acesso a áreas <span className='text-yellow-100'>exclusivas </span> do site além de
              outros beneficios.
            </p>
          </div>
        </>
      )}
      <Footer />
    </section>
  );
};
