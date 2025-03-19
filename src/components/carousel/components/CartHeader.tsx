import { ShoppingCartSimple } from '@phosphor-icons/react';

export const CartHeader = ({ show }: { show: boolean }) => {
  return (
    <div
      className={` ${
        !show && 'hidden'
      } absolute text-zinc-200 top-0 w-full py-4 px-10 flex items-end justify-end`}
    >
      <ShoppingCartSimple weight='bold' className='text-3xl' />
    </div>
  );
};
