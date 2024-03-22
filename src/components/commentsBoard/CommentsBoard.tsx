import { useEffect, useRef, useState } from 'react';
import { dbFire, userAuth } from '../../../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { CommentContainer } from '../commentsContainer/CommentContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/stores';
import { ArrowLineLeft } from '@phosphor-icons/react';

export function CommentsBoard({
  toggleMenu,
  imageId,
  isOpen,
  overFlowComments
}: {
  toggleMenu: () => void;
  setSelectedImage: () => void;
  imageId: string;
  isOpen: boolean;
  toggleCommentBoard: boolean;
  selectedImage: boolean;
  overFlowComments: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState('');
  const [comments, setComments] = useState<
    { userName: string; photoUrl: string; text: string; timestamp: string; imageId: string }[]
  >([]);
  const scrolling = useSelector((state: RootState) => state.layout.scrolling);

  useEffect(() => {
    if (!scrolling) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrolling]);

  useEffect(() => {
    const user = userAuth.currentUser?.displayName as string;
    setCurrentUser(user);
  }, [currentUser]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(dbFire, 'comments');
      const q = query(commentsRef, where('imageId', '==', imageId), orderBy('timestamp'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      });

      return () => unsubscribe();
    };

    fetchComments();
  }, [imageId]);

  return (
    <div>
      <div ref={modalRef} className={`menu-comments-container ${isOpen ? 'open' : ''}  `}>
        <div className={`flex flex-col h-full `}>
          <div
            onClick={toggleMenu}
            className='bg-white items-center flex justify-between px-6 p-2 border border-b-black cursor-pointer '
          >
            <ArrowLineLeft size={30} color='white' />
            <p className='font-bold '>Comentários</p>
            <ArrowLineLeft size={30} />
          </div>
          <div className=' p-6 w-full h-full  '>
            <div className=' w-full h-full flex flex-col justify-between'>
              <div className={`${overFlowComments ? 'overflow-y-scroll no-scrollbar' : ''}`}>
                {comments.map(
                  ({ userName, photoUrl, text, timestamp, imageId }, index: number) => {
                    return (
                      <CommentContainer
                        comment={text}
                        currentUser={userName}
                        imageId={imageId}
                        photoUrl={photoUrl}
                        key={index}
                      />
                    );
                  }
                )}
              </div>
              <div className='py-6'>
                <p className='text-xs text-start text-gray-500 w-full '>
                  logado como {currentUser}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
