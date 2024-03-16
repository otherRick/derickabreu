import { X } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';

interface iDetailsModal {
  url: string;
  alt: string;
  title: string;
  description: string;
  details: string;
  openModal: boolean;
  closeModal: () => void;
}

export const DetailsModal = ({
  url,
  alt,
  title,
  description,
  details,
  openModal,
  closeModal
}: iDetailsModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const openForm = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSfod5qHrLRkl68nh9KT1DcBOe0gyB04_stu2vixuLOh0AYYtQ/viewform?usp=sf_link',
      '_blank'
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (openModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openModal, closeModal]);

  return (
    <div
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      className={` ${
        openModal ? '' : 'hidden'
      } bg-black fixed w-screen h-screen top-0 right-0 z-10 items-center justify-center flex `}
    >
      <X
        onClick={closeModal}
        className='fixed top-10 right-10 cursor-pointer'
        size={40}
        color='white'
      />
      <div
        ref={modalRef}
        style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}
        className='bg-white w-2/6 rounded-md shadow-md shadow-black'
      >
        <img className=' shadow-md shadow-black' src={url} alt={alt} />
        <div className='p-5 space-y-3'>
          <p className='text-3xl font-bold'>{title}</p>
          <p>{description}</p>
          <div className='bg-black h-1 w-full'></div>
          <p className='text-xl'>Detalhes do pacote</p>
          <p>{details}</p>

          <div className='w-full pt-10 h-full items-center justify-center flex'>
            <button onClick={openForm} className='bg-blue-200 p-2 rounded-md'>
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
