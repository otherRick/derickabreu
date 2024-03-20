interface iConfirmation {
  onConfirm: () => void;
  onCancel: () => void;
  desire: string;
  hidden: boolean;
}

export const Confirmation = ({ desire, onConfirm, onCancel, hidden = true }: iConfirmation) => {
  return (
    <div
      style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)' }}
      className={`bg-red-500 w-screen h-screen fixed inset-0  items-center justify-center ${
        hidden ? 'hidden' : 'flex'
      } `}
    >
      <div className='bg-white p-4 gap-4 flex flex-col items-center rounded-md'>
        <p className=''>Deseja {desire} de sua conta?</p>
        <div className='flex flex-col gap-2 text-xs '>
          <button
            onClick={onConfirm}
            className='bg-red-700 hover:bg-red-600 text-white py-1 px-2 rounded-md transition duration-300'
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className='underline hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-md transition duration-300'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
