import { useState } from 'react';

interface iBugetCard {
  url: string;
  alt: string;
  title: string;
  description: string;
  details: string | React.ReactNode;
  onClick: (title: string) => void;
  onSeeMore: (title: string) => void;
}

export const BugetCard = ({
  url,
  alt,
  title,
  description,
  details,
  onClick,
  onSeeMore
}: iBugetCard) => {
  const [moreDescription, setMoreDescription] = useState(false);

  const openForm = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSfod5qHrLRkl68nh9KT1DcBOe0gyB04_stu2vixuLOh0AYYtQ/viewform?usp=sf_link',
      '_blank'
    );
  };

  const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );

  return (
    <>
      {!isMobile ? (
        <div className='w-96 border transform transition-transform duration-300 ease-in-out hover:scale-105'>
          <div className='flex items-center'>
            {/* <div className='w-96 flex justify-between absolute items-center'>
      <CaretLeft size={60} color='white' weight='fill' className='cursor-pointer' />
      <CaretRight size={60} color='white' weight='fill' className='cursor-pointer' />
    </div> */}
            <img src={url} alt={alt} />
          </div>
          <div className='p-5 space-y-3'>
            <div className='flex items-center justify-between'>
              <p className='text-2xl font-bold'>{title}</p>
              <p
                onClick={() => onSeeMore(title)}
                className='cursor-pointer  w-20 text-end underline text-xs'
              >
                ver mais
              </p>
            </div>
            <div className='bg-black h-1 w-full hidden md:block'></div>
            <div className='w-full  h-full items-center justify-center flex'>
              <button onClick={openForm} className='bg-blue-200 p-2 rounded-md'>
                Solicitar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex items-center'>
            {/* <div className='w-96 flex justify-between absolute items-center'>
      <CaretLeft size={60} color='white' weight='fill' className='cursor-pointer' />
      <CaretRight size={60} color='white' weight='fill' className='cursor-pointer' />
    </div> */}

            <img
              onClick={() => setMoreDescription(!moreDescription)}
              src={url}
              alt={alt}
              className='cursor-pointer'
            />
          </div>
          <div className='p-5 space-y-3'>
            <div className='space-y-3 pb-4'>
              <div className='flex items-center justify-between'>
                <p
                  onClick={() => setMoreDescription(!moreDescription)}
                  className='text-3xl font-bold cursor-pointer'
                >
                  {title}
                </p>
                <div className=' h-full items-center justify-center flex'>
                  <button onClick={() => onClick(title)} className='bg-blue-200 p-1 rounded-md'>
                    Solicitar
                  </button>
                </div>
              </div>
              <p className='cursor-pointer'>{moreDescription && description}</p>
              <div className='bg-black h-1 w-full hidden md:block'></div>
            </div>
            <div className='bg-black h-1 w-full block md:hidden'></div>
            <div className={` ${!moreDescription && 'hidden'} pt-4`}>
              <div className='space-y-3'>
                <p className='cursor-pointer'>Detalhes do pacote:</p>
                <p className='cursor-pointer'>{details}</p>
              </div>
              <div className='w-full h-full items-center justify-center mb-10 flex gap-6 flex-col'>
                <button onClick={() => onClick(title)} className='bg-blue-200 p-2 rounded-md'>
                  Solicitar
                </button>
                <p
                  onClick={() => setMoreDescription(!moreDescription)}
                  className='text-xs underline'
                >
                  ver menos
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
