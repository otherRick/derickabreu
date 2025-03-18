import { ArrowLineLeft, Gear, Trash } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

export function HamburgerMenu({
  toggleMenu,
  onEditeProfile,
  loginMethod,
  onDelete,
  isOpen
}: {
  toggleMenu: () => void;
  onEditeProfile: () => void;
  onDelete: () => void;
  isOpen: boolean;
  loginMethod: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [loginType, setLoginType] = useState('');
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleMenu();
      }
    };

    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, toggleMenu]);

  useEffect(() => {
    if (loginMethod === 'password') {
      return setLoginType('email e senha');
    }
    if (loginMethod === 'phone') {
      return setLoginType('número telefônico');
    }
    if (loginMethod === 'google.com') {
      return setLoginType('Google');
    }
  }, [loginMethod]);

  return (
    <div>
      <div ref={modalRef} className={`menu-container ${isOpen ? 'open' : ''}  `}>
        <div className={`flex flex-col h-full `}>
          <div
            onClick={toggleMenu}
            className='bg-white items-center flex justify-between px-6 p-2 border border-b-black cursor-pointer'
          >
            <Gear size={20} color='white' />
            <p className='font-bold'>Fechar Menu</p>
            <ArrowLineLeft size={30} />
          </div>
          <div className=' p-6 w-full h-full '>
            <div className=' w-full h-full flex flex-col justify-between '>
              <div className='space-y-4'>
                <div
                  onClick={() => {
                    onEditeProfile();
                    toggleMenu();
                  }}
                  className=' cursor-pointer border border-b-black border-t-white border-r-white border-l-white p-2 flex justify-between'
                >
                  <p>Editar perfil</p>
                  {/* <Pencil size={20} /> */}
                </div>
                <div className=' cursor-pointer  border border-b-black border-t-white border-r-white border-l-white p-2 flex justify-between'>
                  <p>Perguntas e Respostas</p>
                  {/* <Pencil size={20} /> */}
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    onDelete();
                    toggleMenu();
                  }}
                  className='flex items-center gap-2'
                >
                  <Trash size={15} color='red' />
                  <p className=' text-red-500'>Deletar conta</p>
                </button>
                <p className='text-xs text-start text-gray-500 w-full '>logado com {loginType}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
