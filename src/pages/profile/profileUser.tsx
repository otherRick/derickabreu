// import type { RootState } from '../../app/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from './counterSlice';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/stores';
import { updateProfile } from 'firebase/auth';
import { userAuth } from '../../../firebase';

import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../login/slices/loginSlices';

export const ProfileUser = () => {
  const pro = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const userUpdate = () => {
    const user = userAuth.currentUser;

    const displayName = 'Jane Q. User';
    const photoURL =
      'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/derick%2FEu%20PB.jpeg?alt=media&token=4ba143df-b63b-4754-982b-38549801f426';

    if (user) {
      updateProfile(user, {
        displayName,
        photoURL
      })
        .then(() => {
          // Perfil atualizado com sucesso!
          dispatch(updateUserProfile({ displayName, photoURL }));
          console.log('Perfil atualizado com sucesso!');
        })
        .catch((error) => {
          // Ocorreu um erro ao atualizar o perfil
          console.error('Erro ao atualizar o perfil:', error);
        });
    } else {
      // Não há usuário autenticado no momento
      console.error('Não há usuário autenticado no momento');
    }
  };

  return (
    <section className='bg-black flex flex-col justify-center items-center py-10 gap-10'>
      <div className='bg-white w-40 h-40 rounded-full'>
        <img src={pro.photoURL} alt='user' />
      </div>
      <div className='text-white w-40 items-start'>
        <div className='flex'>
          <p>Name:</p>
          <p>{pro.displayName}</p>
        </div>
        <div className='flex'>
          <p>Phone:</p>

          <p>{pro.phoneNumber}</p>
        </div>
        <div className='flex'>
          <p>uid:</p>
          <p>{pro.uid}</p>
        </div>
      </div>
      <button onClick={userUpdate} className='w-40 rounded-md p-2 bg-white'>
        update profile
      </button>
    </section>
  );
};
