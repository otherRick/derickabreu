import { ReactNode, useEffect, useRef, useState } from 'react';
import { downloadMedia } from '../../api/repository/downloadmedia';
import { Eye, Heart, X } from '@phosphor-icons/react';
import { Footer } from '../../components/footer/Footer';
import ReactGA from 'react-ga';
import { userAuth } from '../../../firebase';
import { LoginSMS } from '../login/loginSMS';
import { filesToDownload } from './helpers/filesToDownload';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { CommentBox } from './components/commentBox/CommentBox';
import { CommentsBoard } from '../../components/commentsBoard/CommentsBoard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { scrollingState, scrollingToggle } from '../../components/layout/slices/layoutSlices';
import { RootState } from '../../store/stores';

export const Photography = () => {
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCounter, setLikeCounter] = useState({ none: 'node' });
  const [openLogin, setOpenLogin] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [imageId, setImageId] = useState('');
  const [toggleCommentBoard, setToggleCommentBoard] = useState(false);
  const [viewCounter, setViewCounter] = useState<ReactNode>('');

  const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const scrolling = useSelector((state: RootState) => state.layout.scrolling);

  useEffect(() => {
    if (!scrolling) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrolling]);

  const handleClick = () => {
    if (scrolling) {
      dispatch(scrollingState(false));
    } else {
      dispatch(scrollingState(true));
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const isLikeRef = ref(db, `images/${imageId}/likes`);

    // Obtém os likes da imagem atual
    onValue(isLikeRef, (snapshot) => {
      const data = snapshot.val();

      setLikeCounter(data ? data : {});

      // Verifica se o usuário atual deu like na imagem atual
      const currentUserUid = userAuth.currentUser?.uid;

      const currentUserLiked = data && data[currentUserUid as string] ? true : false;

      setLike(currentUserLiked);
    });
  }, [imageId]);

  useEffect(() => {
    const db = getDatabase();
    const imgCounterRef = ref(db, `images/${imageId}/clicks`);

    onValue(imgCounterRef, (snapshot) => {
      const data = snapshot.val();

      const total = Object.values(data).reduce((acc, curr) => {
        if (typeof curr === 'number') {
          return (acc as number) + curr;
        }
        return acc;
      }, 0);
      setViewCounter(total as number);
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = await downloadMedia(filesToDownload);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchData();
  }, []);

  const ga = () => {
    ReactGA.event({
      category: 'Cards',
      action: 'Clique no card',
      label: 'title'
    });
  };
  const getImgId = (url: string) => {
    const filenameWithParams = url.substring(url.lastIndexOf('/') + 1);

    const filename = filenameWithParams.split('?')[0];

    setImageId(filename.slice(7).split('.')[0]);
  };

  const onLike = () => {
    userAuth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('logged');

        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        console.log('not logged in');
        setOpenLogin(true);
      }
    });

    const userId = userAuth.currentUser?.uid;

    const db = getDatabase();

    if (!imageId) {
      console.error('ID da imagem não encontrado');
      return;
    }

    const imageRef = ref(db, `images/${imageId}/likes/${userId}`);

    console.log('imageRef', imageRef);

    if (like) {
      set(imageRef, null).catch((error) => {
        console.error('Erro ao remover a curtida:', error);
        setLike(!like);
      });
    } else {
      set(imageRef, true).catch((error) => {
        console.error('Erro ao adicionar a curtida:', error);
        setLike(!like);
      });
    }
  };

  const photoOrientation = (url: string) => {
    const img = new Image();
    img.onload = () => {
      const largura = img.width;
      const altura = img.height;

      if (largura > altura) {
        setLandscape(false);
      } else if (largura < altura) {
        setLandscape(true);
      } else {
        setLandscape(true);
      }
    };
    img.src = url;
  };

  const clickCounter = () => {
    const user = userAuth.currentUser?.displayName;
    const db = getDatabase();
    const dbRef = ref(db, `/images/${imageId}/clicks/${user}`);
    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const currentCount = snapshot.val();
          const newCount = currentCount + 1;
          set(dbRef, newCount);
        } else {
          set(dbRef, 1);
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
      });
  };

  return (
    <div className='relative'>
      <CommentsBoard
        setSelectedImage={() => setSelectedImage(false)}
        selectedImage={selectedImage}
        toggleCommentBoard={toggleCommentBoard}
        overFlowComments={toggleCommentBoard}
        imageId={imageId}
        toggleMenu={() => setToggleCommentBoard(false)}
        isOpen={!toggleCommentBoard}
      />
      <LoginSMS open={openLogin} closeLogin={() => setOpenLogin(false)} />
      <div>
        {imageUrls ? (
          <div className='image-grid'>
            {imageUrls.map((url, index) => (
              <img
                onClick={() => {
                  photoOrientation(url);
                  setFullImage(url);
                  setSelectedImage(true);
                  getImgId(url);
                  clickCounter();
                  handleClick();
                  ga();
                }}
                key={index}
                src={url}
                alt={`Downloaded Media ${index}`}
                width={'100%'}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div
        style={{ backgroundColor: ' rgba(0, 0, 0, 0.7)' }}
        className={`${
          selectedImage ? '' : 'hidden'
        } fixed top-0 left-0 h-screen w-screen bg-black z-100 items-center justify-center flex`}
      >
        <div
          onClick={() => {
            setSelectedImage(false);
            handleClick();
          }}
          className='flex items-center gap-2 text-white opacity-70 fixed top-16 right-16'
        >
          <p>FECHAR</p>
          <X className='' color='white' size={32} />
        </div>
        <div
          ref={modalRef}
          className={`bg-white md:w-2/3 p-2 h-fit items-center justify-center flex flex-col ${
            !landscape ? ' max-w-[1200px]' : ' max-w-[550px]'
          }`}
        >
          <img src={fullImage?.toString()} alt={`Downloaded Media ${'fullImage'}`} />
          <div className=' w-full  flex items-center justify-between p-6'>
            <div className='flex text-xs items-center w-2/12 gap-2'>
              <Eye size={20} />
              {viewCounter} {''}
            </div>
            <CommentBox
              isOpen={!toggleCommentBoard}
              imageId={imageId}
              openCommentsBox={() => setToggleCommentBoard(true)}
              closeCommentsBox={() => setToggleCommentBoard(false)}
            />
            <div className='flex items-center w-2/12 gap-2 justify-end'>
              <p>{Object.keys(likeCounter).length}</p>
              <Heart
                onClick={onLike}
                size={20}
                className='text-red-500 hover:text-red-400'
                weight={`${like ? 'fill' : 'light'}`}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer black />
    </div>
  );
};
