import { ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';

import { Eye, Heart, ShoppingBag, ShoppingCartSimple, X } from '@phosphor-icons/react';
import ReactGA from 'react-ga';
import { userAuth } from '../../../../../firebase';
import { LoginSMS } from '../../../login/loginSMS';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { CommentBox } from '../commentBox/CommentBox';
import { CommentsBoard } from '../../../../components/commentsBoard/CommentsBoard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { scrollingState } from '../../../../components/layout/slices/layoutSlices';
import { RootState } from '../../store/stores';
import { downloadAllPublicAlbuns } from '../../../../api/repository/downloadmedia';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { photosession } from '../../helpers/photosession';

export const PublicGallery = () => {
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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [albumKey, setAlbumKey] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { keyPass } = location.state || {};

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  useEffect(() => {
    if (keyPass) {
      console.log('ok');
      const fetchData = async () => {
        try {
          const urls = await downloadAllPublicAlbuns(keyPass);
          setImageUrls(urls);
        } catch (error) {
          console.error('Error fetching media:', error);
        }
      };

      fetchData();
    } else {
      console.log('oh no!');
      setOpenModal(true);
    }
  }, []);

  const handleEnterKey = async () => {
    try {
      const urls = await downloadAllPublicAlbuns(albumKey);
      setImageUrls(urls);
      if (albumKey === foundAlbum.keyPass) {
        setOpenModal(false);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  // Cleaning image name
  const decoded = decodeURIComponent(imageId);
  const cleanName = decoded.replace(/^os\//, '');

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

  const downloadImage = async () => {
    try {
      const response = await fetch(fullImage);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = cleanName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleSendWhatsapp = () => {
    const numeroTelefone = '5521973621887';
    const extractFileName = () => {
      const urlObj = new URL(fullImage);
      const pathname = urlObj.pathname;
      const fileName = pathname.split('/').pop();
      return fileName || '';
    };

    const mensagem = `Gostaria de comprar esta imagem:%0A${extractFileName()}`;
    const link = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

    window.open(link, '_blank');
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
      <Modal
        onClose={() => {
          setOpenModal(false), navigate('/photography');
        }}
        show={openModal}
      >
        <Modal.Header>{foundAlbum.album}</Modal.Header>
        <Modal.Body>
          <div className='flex flex-col'>
            <p>Enter Key</p>
            <input value={albumKey} onChange={(e) => setAlbumKey(e.target.value)} type='text' />
            <Button onClick={handleEnterKey}>Entrar</Button>
            <a className='underline' href='/photography'>
              fechar
            </a>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        {imageUrls ? (
          <div className='image-grid'>
            {imageUrls.map((url, index) => (
              <div
                key={index}
                onClick={() => {
                  photoOrientation(url);
                  setFullImage(url);
                  setSelectedImage(true);
                  getImgId(url);
                  clickCounter();
                  handleClick();
                  ga();
                }}
                className='w-fit relative h-fit'
              >
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
                  src={url}
                  alt={`Downloaded Media ${index}`}
                  width={'100%'}
                />
              </div>
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
        } fixed -top-10 left-0 h-screen w-screen bg-black z-100 items-center justify-center flex`}
      >
        <div
          ref={modalRef}
          className={`bg-white md:w-2/3 p-2 h-fit items-center justify-center flex flex-col ${
            !landscape ? ' max-w-[1200px]' : ' max-w-[550px]'
          }`}
        >
          <img src={fullImage?.toString()} alt={`Downloaded Media ${'fullImage'}`} />
          <div className='z-50 w-full  flex items-center justify-between p-6'>
            {/* <div className='flex text-xs items-center w-2/12 gap-2'>
              <Eye size={20} />
              {viewCounter} {''}
            </div> */}

            <div
              onClick={handleSendWhatsapp}
              style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
              className={` ${
                !foundAlbum.payToview && 'hidden'
              } flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
            >
              <ShoppingCartSimple className='' />
              <p>Comprar</p>
            </div>
            <div
              onClick={downloadImage}
              style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
              className={` ${
                foundAlbum.payToview && 'hidden'
              } flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
            >
              <ArrowDownTrayIcon className='w-8  hover:text-zinc-800' />
            </div>

            <div
              onClick={() => {
                setSelectedImage(false);
                handleClick();
              }}
              style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
              className='flex items-center p-1 gap-2 text-white opacity-70 top-16 md:right-16 right-4 rounded-xl'
            >
              {/* <p className='text-white font-bold'>FECHAR</p> */}
              <X className=' hover:text-zinc-800' size={32} />
            </div>
            {/* <CommentBox
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
