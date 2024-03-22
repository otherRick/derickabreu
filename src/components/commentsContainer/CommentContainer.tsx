import { TrashSimple } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

interface ICommentContainer {
  comment: string;
  imageId: string;
  photoUrl: string;
  currentUser: string;
}

export const CommentContainer = ({
  comment,
  imageId,
  photoUrl,
  currentUser
}: ICommentContainer) => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const secondsTimestamp = 1711126586;
    const milliseconds = secondsTimestamp * 1000;
    const secondsDate = new Date(milliseconds);
    setDate(secondsDate);
  }, []); // Use um array de dependências vazio para garantir que o efeito seja executado apenas uma vez durante a montagem do componente

  return (
    <div className='space-y-4  p-2 mb-6 '>
      <div className='flex items-center justify-between gap-2 border border-zinc-200 border-t-0 border-x-0 '>
        <img className='w-8 h-8 rounded-full' src={photoUrl} alt={imageId} />
        <p className='font-bold w-full'>{currentUser}</p>
        <p className='text-xxs'>{date?.toLocaleString()}</p>
        <TrashSimple className='text-black hover:text-red-700' size={20} />
      </div>
      <p>{comment}</p>
    </div>
  );
};
