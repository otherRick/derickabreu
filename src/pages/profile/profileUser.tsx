import { useSelector } from 'react-redux';
import { RootState } from '../../store/stores';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  sendEmailVerification,
  signOut,
  updateEmail,
  updateProfile
} from 'firebase/auth';
import { userAuth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { ProfileState, updateUserProfile } from '../login/slices/loginSlices';
import { Confirmation } from '../../components/modals/confirmation/Confirmation';
import { SetStateAction, useEffect, useState } from 'react';
import { Footer } from '../../components/footer/Footer';
import { ChooseLoginMethodModal } from '../../components/modals/chooseLoginMethodModal/ChooseLoginMethodModal';
import { User } from 'firebase/auth/web-extension';
import { HamburgerMenu } from '../../components/hamburgerMenu/HamburgerMenu';
import { EditableTextInput } from './components/editableTextInput/EditableTextInput';
import { LogoutAndConfig } from './components/logoutAndConfig.tsx/LogoutAndConfig';
import { Avatar } from './components/avatar/Avatar';
import { Unloged } from './components/unloged/Unloged';
import { getDatabase, ref, update } from 'firebase/database';

export const ProfileUser = () => {
  const pro = useSelector((state: RootState) => state.profile);
  const [closeCofirmation, setCloseConfirmation] = useState(true);
  const [closeCofirmationDelete, setCloseConfirmationDele] = useState(true);
  const [editPRofile, setEditProfile] = useState(false);
  const [updateData, setUpdateData] = useState<ProfileState>(pro);
  const [originalData, setOriginalData] = useState<SetStateAction<ProfileState>>(pro);
  const [openLogin, setOpenLogin] = useState(false);
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');
  const [toggleMenu, setToggleMenu] = useState(true);
  const [askPassword, setAskPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [nonVerifiedWarning, setNonVerifiedWarning] = useState(true);
  const [sendNewLink, setSendNewLink] = useState(true);
  const [email, setEmail] = useState('');
  const [successSend, setSuccessSendModal] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setOriginalData(pro);
    const user = userAuth.currentUser;

    if (user) {
      setLoginMethod(user.providerData[0].providerId);
    }
    const isVerified = userAuth.currentUser?.emailVerified;

    if (!isVerified && loginMethod === 'password') {
      return setNonVerifiedWarning(false);
    }
  }, [loginMethod, pro]);

  const emailVerificationLinkSender = () => {
    const actionCodeSettings = {
      url: 'https://portfoto-ac408.web.app',
      handleCodeInApp: true
    };
    const user = userAuth?.currentUser as User;
    sendEmailVerification(user, actionCodeSettings)
      .then(() => {
        console.log('mandou');
        setSuccessSendModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userUpdate = async (updateData: ProfileState) => {
    const currentUser = userAuth.currentUser;

    if (currentUser) {
      if (updateData.email !== currentUser.email) {
        if (password) {
          const credential = EmailAuthProvider.credential(currentUser?.email as string, password);
          reauthenticateWithCredential(currentUser, credential)
            .then(() => {
              return updateEmail(currentUser, updateData.email as string);
            })
            .then(() => {
              console.log('Email updated successfully!');
              setPassword('');
            })
            .catch((error) => {
              console.error('Error updating email:', error);
            });
        } else {
          console.error('Current password is required for reauthentication.');
        }
      }
      if (pro.phoneNumber !== updateData.phoneNumber) {
        const updatedData = {
          phoneNumber: updateData.phoneNumber
        };

        const userId = currentUser.uid;
        const db = getDatabase();

        const userRef = ref(db, `/users/${userId}`);
        update(userRef, updatedData)
          .then(() => {
            console.log('Data updated successfully!');
          })
          .catch((error) => {
            console.error('Error updating data:', error);
          });
      }

      try {
        await updateProfile(currentUser, updateData);

        dispatch(
          updateUserProfile({
            displayName: updateData.displayName,
            photoURL: updateData.photoURL,
            email: updateData.email,
            phoneNumber: updateData.phoneNumber
          })
        );
        window.location.reload();
        console.log('Successfully updated user profile');
      } catch (error) {
        console.error('Error updating user profile:', error);
        console.log(error);
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
      });
  };

  return (
    <>
      <section className='bg-black flex flex-col h-screen justify-center  items-center py-10 pb-40 w-full'>
        <HamburgerMenu
          onDelete={() => setCloseConfirmationDele(false)}
          loginMethod={loginMethod}
          onEditeProfile={onEdit}
          toggleMenu={() => setToggleMenu(!toggleMenu)}
          isOpen={toggleMenu}
        />
        <Confirmation
          children={
            <p>
              Realmente quer <span className='text-red-600'>DELETAR</span> sua conta ?
            </p>
          }
          onConfirm={delUser}
          onCancel={() => setCloseConfirmationDele(true)}
          hidden={closeCofirmationDelete}
        />
        <Confirmation
          children={
            <p>
              Deseja <span className='text-red-600'>sair</span> da sua conta ?
            </p>
          }
          onConfirm={logout}
          onCancel={() => setCloseConfirmation(true)}
          hidden={closeCofirmation}
        />
        <Confirmation
          inputMode
          children={<p>'Para alterar o email é preciso confirmar a senha associada a ele.'</p>}
          onChange={(e) => setPassword(e.target.value)}
          value={password ? password : ''}
          onConfirm={() => {
            userUpdate(updateData);
            setAskPassword(true);
          }}
          onCancel={() => setAskPassword(true)}
          hidden={askPassword}
        />
        <Confirmation
          children={
            <div className='text-center'>
              <p>
                Parece que seu email de acesso ainda{''}
                <span className='text-red-600'> não foi verificado ! </span> <br /> <br />
                Por favor, verifique seu email incluindo a caixa de{' '}
                <span className='text-red-600'>SPAM</span> e click no link para de verificação do
                email.
              </p>
            </div>
          }
          confirmBtnText='Sair'
          closeBtnText='Enviar novo link'
          onChange={(e) => setPassword(e.target.value)}
          value={password ? password : ''}
          onConfirm={() => {
            setNonVerifiedWarning(true);
            logout();
          }}
          onCancel={() => setSendNewLink(false)}
          hidden={!nonVerifiedWarning && userAuth.currentUser ? false : true}
        />
        <Confirmation
          inputMode
          children={
            <div>
              <p>Digite o email para receber um novo link de verificação</p>
            </div>
          }
          confirmBtnText='Enviar novo link'
          type='email'
          closeBtnText='Cancelar'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onConfirm={() => {
            emailVerificationLinkSender();
          }}
          onCancel={() => {
            setSendNewLink(true);
            logout();
          }}
          hidden={sendNewLink}
        />
        <Confirmation
          greenConfirm
          children={
            <div className='text-center'>
              <p>Link de verificação enviado com sucesso !</p>
              <p>
                Confira o seu email e principalmente a caixa de{' '}
                <span className='text-red-600'>SPAM</span>!
              </p>
            </div>
          }
          confirmBtnText='Fechar'
          onConfirm={() => {
            setSuccessSendModal(true);
            logout();
          }}
          hidden={successSend}
        />

        <ChooseLoginMethodModal closeLogin={() => setOpenLogin(false)} openLogin={openLogin} />
        {userAuth.currentUser ? (
          <>
            <div className='h-full justify-between flex  flex-col items-center md:items-start  w-9/12'>
              <div className='flex flex-col h-full items-star w-72'>
                <Avatar
                  setEditProfile={() => setEditProfile(false)}
                  editPRofile={editPRofile}
                  oldState={pro}
                  onMouseEnter={() => setShowEditPhoto(true)}
                  onMouseLeave={() => setShowEditPhoto(false)}
                  showEditPhoto={showEditPhoto}
                />

                <EditableTextInput
                  onBlur={() => setAskPassword(false)}
                  loginMethod={loginMethod}
                  editPRofile={editPRofile}
                  oldStade={pro}
                  onCancelEdit={onCancelEdit}
                  saveChanges={saveChanges}
                  onChangeName={(value) => setUpdateData({ ...updateData, displayName: value })}
                  onChangePhone={(value) => setUpdateData({ ...updateData, phoneNumber: value })}
                  onChangeEmail={(value) => setUpdateData({ ...updateData, email: value })}
                  updateData={updateData}
                />
                <LogoutAndConfig
                  editPRofile={editPRofile}
                  setToggleMenu={() => setToggleMenu(false)}
                  onCloseConfirmation={() => setCloseConfirmation(false)}
                />
              </div>
            </div>
          </>
        ) : (
          <Unloged onEnter={() => setOpenLogin(true)} />
        )}
      </section>
      <Footer />
    </>
  );
};
