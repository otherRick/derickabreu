import { ShoppingCart, XCircle } from '@phosphor-icons/react';
import { Button, CustomFlowbiteTheme, Dropdown, Popover } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { photosession } from '../../pages/photography/helpers/photosession';
import { brlConverter } from '../../pages/photography/utils/brlConverter';
import { whatsappSander } from '../../utils/whatsappSender';
import { useDispatch } from 'react-redux';
import { removeCart } from '../../pages/photography/slices/cartSlice';

interface CartDropdownProps {
  album: (typeof photosession)[number] | undefined;
}

export const CartDropdown = ({ album }: CartDropdownProps) => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const customTheme: CustomFlowbiteTheme = {
    dropdown: {
      arrowIcon: 'hidden',
      content: 'py-1 focus:outline-none w-80 p-4 '
    }
  };

  const priceInDiscont = () => {
    if (cartItems?.files.length >= 3 && cartItems.files.length <= 8) {
      return { value: cartItems.totalPrice - cartItems.totalPrice * 0.1, amount: '10%' };
    } else if (cartItems?.files.length > 8) {
      return { value: cartItems.totalPrice - cartItems.totalPrice * 0.2, amount: '20%' };
    }
    return { value: cartItems?.totalPrice || 0, amount: '' };
  };

  const handlerSendWhatsapp = () => {
    if (!cartItems || cartItems.files.length === 0) return;

    const itemsString = cartItems.files
      .map((item: { name: string; price: number }) => `- ${item.name}, R$${item.price}`)
      .join('%0A');
    whatsappSander(
      `${itemsString} %0A> Valor total: ${brlConverter(cartItems.totalPrice)} %0A> Valor com ${
        priceInDiscont().amount
      } de desconto = *${brlConverter(priceInDiscont().value)}*`
    );
  };

  return (
    <div className='relative'>
      <div
        className={`${
          !cartItems.files.length && 'hidden'
        } bg-red-500 right-4 top-3 z-10 flex items-center justify-center rounded-full p-1 h-5 w-5 absolute text-white text-xs font-bold`}
      >
        {cartItems.files.length}
      </div>
      <Dropdown
        style={{ backgroundColor: 'transparent' }}
        theme={customTheme.dropdown}
        label={
          <ShoppingCart
            className=' text-zinc-400  hover:text-zinc-800 w-12 h-12 p-2 cursor-pointer'
            weight='bold'
          />
        }
      >
        <Dropdown.Header>
          <span className='block text-sm'>Carrinho de fotos</span>
          <span className='block truncate text-sm font-medium'>{album?.album}</span>
        </Dropdown.Header>
        <div className='overflow-auto max-h-96'>
          {cartItems.files?.map(({ url, name, price }) => {
            return (
              <>
                <div className='flex items-center justify-between '>
                  <XCircle
                    onClick={() => dispatch(removeCart(name))}
                    className='p-2 hover:text-red-400'
                    size={40}
                  />
                  <Popover
                    trigger={`${window.innerWidth < 1024 ? 'click' : 'hover'}`}
                    content={<img className='md:w-96 w-60' src={url} alt={name} />}
                    placement='auto'
                  >
                    <img width={40} src={url} alt={name} />
                  </Popover>
                  <p>{name}</p>
                  <p className='text-green-700 font-medium p-2 rounded-md'>
                    {brlConverter(price)}
                  </p>
                </div>
                <Dropdown.Divider />
              </>
            );
          })}
        </div>

        <Dropdown.Item className='flex items-end justify-evenly'>
          {cartItems.files.length ? (
            <>
              <p>{cartItems.files.length} x fotos por</p>
              <div>
                <p className='line-through text-xs text-red-900'>
                  {priceInDiscont().amount && ''} {brlConverter(cartItems.totalPrice)}
                </p>
                <p className='text-xl text-green-700 font-bold'>
                  {brlConverter(priceInDiscont().value)}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p>Nenhum item selecionado</p>
              </div>
            </>
          )}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Button
          onClick={handlerSendWhatsapp}
          className={`w-full ${!cartItems.files.length && 'hidden'}`}
        >
          Comprar
        </Button>
      </Dropdown>
    </div>
  );
};
