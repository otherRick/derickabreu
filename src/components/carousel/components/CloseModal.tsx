import { X } from '@phosphor-icons/react';

export const CloseModal = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
      className={`flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
    >
      <X className=' hover:text-zinc-800' />
      Fechar
    </div>
  );
};
