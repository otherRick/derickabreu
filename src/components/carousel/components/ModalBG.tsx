import { ReactNode } from 'react';

export const ModalBG = ({ show, children }: { show: boolean; children: ReactNode }) => {
  return (
    <div
      style={{ backgroundColor: ' rgba(0, 0, 0, 0.7)' }}
      className={`${
        show ? '' : 'hidden'
      } fixed top-0 left-0 h-screen w-screen bg-black z-100  items-center justify-evenly flex`}
    >
      {children}
    </div>
  );
};
