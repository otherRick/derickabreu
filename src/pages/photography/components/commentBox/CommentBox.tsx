import { EnvelopeSimple, EnvelopeSimpleOpen, PaperPlaneRight } from '@phosphor-icons/react';
import { addDoc, collection } from 'firebase/firestore';
import { dbFire, userAuth } from '../../../../../firebase';
import { useState } from 'react';
import { ChooseLoginMethodModal } from '../../../../components/modals/chooseLoginMethodModal/ChooseLoginMethodModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/stores';

export const CommentBox = ({
  imageId,
  openCommentsBox,
  closeCommentsBox,
  isOpen
}: {
  imageId: string | void;
  isOpen?: boolean;
  openCommentsBox?: () => void;
  closeCommentsBox?: () => void;
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [openLogin, setOpenLogin] = useState(false);
  const isLogged = useSelector((state: RootState) => state.userStatus.isLogged);

  const handleSubmitComment = async () => {
    const commentsRef = collection(dbFire, 'comments');

    const profileImage = userAuth.currentUser?.photoURL;

    const newComment = {
      userId: userAuth.currentUser?.uid,
      userName: userAuth.currentUser?.displayName,
      status: 'pending',
      imageId: imageId,
      photoUrl: profileImage,
      text: newCommentText,
      timestamp: new Date()
    };

    await addDoc(commentsRef, newComment);

    setNewCommentText('');
  };
  const onFocus = () => {
    if (isLogged) {
      console.log('parabrens');
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <div className='w-7/12 items-center flex border hover:border-zinc-500  border-zinc-400 rounded-md border-t-0 border-l-0 '>
      <ChooseLoginMethodModal
        message='Para ter acesso aos comentários você precisa estar logado!'
        closeLogin={() => setOpenLogin(false)}
        openLogin={openLogin}
      />
      {isOpen ? (
        <>
          {isLogged ? (
            <EnvelopeSimple
              onClick={openCommentsBox}
              size={30}
              className='text-zinc-400 hover:text-zinc-500'
            />
          ) : (
            <EnvelopeSimple
              onClick={() => setOpenLogin(true)}
              size={30}
              className='text-zinc-400 hover:text-zinc-500'
            />
          )}
        </>
      ) : (
        <EnvelopeSimpleOpen
          onClick={closeCommentsBox}
          size={30}
          className='text-zinc-400 hover:text-zinc-500'
        />
      )}
      <input
        onChange={(e) => setNewCommentText(e.target.value)}
        onFocus={onFocus}
        value={newCommentText}
        className='w-full p-2 outline-none '
        placeholder='Adicione seu comentário.'
        type='text'
      />
      <PaperPlaneRight
        onClick={handleSubmitComment}
        size={30}
        className='text-zinc-400 hover:text-zinc-500'
      />
    </div>
  );
};
