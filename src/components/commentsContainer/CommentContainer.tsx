import { TrashSimple } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
interface ICommentContainer {
  comment: string;
  imageId: string;
  photoUrl: string;
  currentUser: string;
  timestamp: string;
}

export const CommentContainer = ({
  comment,
  imageId,
  photoUrl,
  timestamp,
  currentUser
}: ICommentContainer) => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const timestampDate = new Date(timestamp);
    setDate(timestampDate);
  }, [timestamp]);

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
