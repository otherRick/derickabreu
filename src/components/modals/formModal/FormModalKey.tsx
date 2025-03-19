import { Button, Modal } from 'flowbite-react';

interface FormModalKeyProps {
  onClose: () => void;
  openModal: boolean;
  name: string | undefined;
  albumKey: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
}

export const FormModalKey = ({
  onClose,
  openModal,
  name,
  albumKey,
  onChange,
  onConfirm
}: FormModalKeyProps) => {
  return (
    <Modal onClose={onClose} show={openModal}>
      <Modal.Header>{name}</Modal.Header>
      <Modal.Body>
        <div className='flex flex-col'>
          <p>Enter Key</p>
          <input value={albumKey} onChange={(e) => onChange(e.target.value)} type='text' />
          <Button onClick={onConfirm}>Entrar</Button>
          <a className='underline' href='/photography'>
            fechar
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};
