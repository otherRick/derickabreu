import { Button, Modal } from 'flowbite-react';
import { InputHTMLAttributes } from 'react';
import { whatsappSander } from '../../../utils/whatsappSender';

interface FormModalKeyProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onClose: () => void;
  openModal: boolean;
  name: string | undefined;
  albumKey: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  placeholder: string;
}

export const FormModalKey = ({
  onClose,
  openModal,
  name,
  albumKey,
  onChange,
  onConfirm,
  placeholder,
  ...rest
}: FormModalKeyProps) => {
  const handlerAskKey = () => {
    whatsappSander('%0AGostaria de obter a chave de acesso do seguinte evento:');
  };
  return (
    <Modal onClose={onClose} show={openModal}>
      <Modal.Header>{name ? name : 'Evento Privado'}</Modal.Header>
      <Modal.Body>
        <div className='flex flex-col gap-4'>
          {!name && (
            <p>
              É nescessario inserir uma senha de acesso para visualizar as fotos. Caso ainda não
              tenha recebido, solocite sua chave de acesso{' '}
              <span onClick={handlerAskKey} className='underline text-blue-500 cursor-pointer'>
                clicando aqui.
              </span>
            </p>
          )}
          <div>
            <p className='font-semibold'>Chave do álbum</p>
            <input
              {...rest}
              placeholder={`${placeholder ? placeholder : 'insira a chave'}`}
              className={`${placeholder ? 'placeholder:text-red-600 animate-pulse' : ''}w-full`}
              value={albumKey}
              onChange={(e) => onChange(e.target.value)}
              type='text'
            />
          </div>
          <Button onClick={onConfirm}>Entrar</Button>
          <a className='underline w-full justify-center flex' href='/photography'>
            fechar
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};
