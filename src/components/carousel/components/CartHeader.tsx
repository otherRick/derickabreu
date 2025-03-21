import { photosession } from '../../../pages/photography/helpers/photosession';
import { CartDropdown } from '../../dropdowns/CartDropdown';

interface CartHeaderProps {
  album: (typeof photosession)[number] | undefined;
  show: boolean;
}

export const CartHeader = ({ show, album }: CartHeaderProps) => {
  return (
    <div
      className={` ${
        !show && 'hidden'
      } absolute text-zinc-200 top-0 w-full py-4 px-40 flex items-end md:justify-end justify-center`}
    >
      <CartDropdown album={album} />
    </div>
  );
};
