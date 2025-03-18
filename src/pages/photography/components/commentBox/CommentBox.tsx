import { EnvelopeSimple, EnvelopeSimpleOpen, PaperPlaneRight } from '@phosphor-icons/react';
import { addDoc, collection } from 'firebase/firestore';
import { dbFire, userAuth } from '../../../../../firebase';
import { useState } from 'react';

export const CommentBox = ({
  imageId,
  openCommentsBox,
  closeCommentsBox,
  isOpen
}: {
  imageId: string;
  isOpen?: boolean;
  openCommentsBox?: () => void;
  closeCommentsBox?: () => void;
}) => {
  const [newCommentText, setNewCommentText] = useState('');

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

  return (
    <div className='w-7/12 items-center flex border hover:border-zinc-500  border-zinc-400 rounded-md border-t-0 border-l-0 '>
      {isOpen ? (
        <EnvelopeSimple
          onClick={openCommentsBox}
          size={30}
          className='text-zinc-400 hover:text-zinc-500'
        />
      ) : (
        <EnvelopeSimpleOpen
          onClick={closeCommentsBox}
          size={30}
          className='text-zinc-400 hover:text-zinc-500'
        />
      )}
      <input
        onChange={(e) => setNewCommentText(e.target.value)}
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
