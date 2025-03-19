import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export const Selector = ({
  prevImage,
  nextImage
}: {
  prevImage: () => void;
  nextImage: () => void;
}) => {
  return (
    <>
      <div
        onClick={prevImage}
        className='h-40 flex items-center absolute opacity-40 left-5 md:-left-40'
      >
        <div className='bg-black text-white rounded-full p-2 text-xl md:text-6xl font-bold'>
          <CaretLeft />
        </div>
      </div>
      <div
        onClick={nextImage}
        className='h-40 flex items-center absolute opacity-40 right-5 md:-right-40'
      >
        <div className='bg-black text-white rounded-full p-2 text-xl md:text-6xl font-bold'>
          <CaretRight />
        </div>
      </div>
    </>
  );
};
