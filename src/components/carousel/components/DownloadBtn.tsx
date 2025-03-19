import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { photosession } from '../../../pages/photography/helpers/photosession';

export const DownloadBtn = ({
  onClick,
  foundAlbum
}: {
  onClick: () => void;
  foundAlbum: (typeof photosession)[number] | undefined;
}) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
      className={` ${
        foundAlbum?.payToview && 'hidden'
      } flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
    >
      <ArrowDownTrayIcon className='w-8  hover:text-zinc-800' />
    </div>
  );
};
