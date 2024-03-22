import { useEffect, useRef } from 'react';

const CustomPrompt = ({ onClose }) => {
  const passwordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPassword = passwordRef?.current.value;
    // Faça algo com a senha
    onClose(currentPassword);
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit}>
        <input
          ref={passwordRef}
          type='password'
          className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          placeholder='Enter your current password'
        />
        <button
          type='submit'
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomPrompt;
