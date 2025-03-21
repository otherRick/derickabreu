import { ShoppingCartSimple, Trash } from '@phosphor-icons/react';
import { photosession } from '../../../pages/photography/helpers/photosession';
import { useDispatch } from 'react-redux';
import { addCart, addedFilesProps, removeCart } from '../../../pages/photography/slices/cartSlice';
import { brlConverter } from '../../../pages/photography/utils/brlConverter';
import { useSelector } from 'react-redux';

export const CartBtn = ({
  foundAlbum,
  itemData
}: {
  foundAlbum: (typeof photosession)[number] | undefined;
  itemData: addedFilesProps;
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.files);

  const itemEncontrado = cartItems.find((item) => item.name === itemData.name);

  return (
    <div
      onClick={() =>
        itemEncontrado ? dispatch(removeCart(itemData.name)) : dispatch(addCart(itemData))
      }
      style={{
        backgroundColor: `${!itemEncontrado ? 'rgba(1,1,1,0.5)' : 'rgba(255, 0, 0, 0.9)'}`
      }}
      className={` ${
        !foundAlbum?.payToview && 'hidden'
      } flex items-center p-2 rounded-xl gap-2 text-white opacity-70 top-16 md:left-16 left-4 hover:text-blue-400 cursor-pointer`}
    >
      {itemEncontrado ? (
        <div className='flex items-center gap-2 '>
          <Trash /> <p>Remover</p>
        </div>
      ) : (
        <ShoppingCartSimple />
      )}
      <p className={`${itemEncontrado && 'hidden'}`}>{brlConverter(itemData.price)}</p>
    </div>
  );
};
