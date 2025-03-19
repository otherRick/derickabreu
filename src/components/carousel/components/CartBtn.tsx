import { ShoppingCartSimple } from '@phosphor-icons/react';
import { photosession } from '../../../pages/photography/helpers/photosession';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../pages/photography/slices/cartSlice';
import { selectedImageProps } from '../helpers/CarouselProps';

export const CartBtn = ({
  onClick,
  foundAlbum,
  itemData
}: {
  onClick: () => void;
  foundAlbum: (typeof photosession)[number] | undefined;
  itemData: selectedImageProps;
}) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        onClick(), dispatch(addCart(itemData));
      }}
      style={{ backgroundColor: 'rgba(1,1,1,0.5)' }}
      className={` ${
        !foundAlbum?.payToview && 'hidden'
      } flex items-center p-2 rounded-xl  gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
    >
      <ShoppingCartSimple />
      <p>Adicionar</p>
    </div>
  );
};
