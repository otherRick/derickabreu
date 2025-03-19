import { ReactNode } from 'react';

export const Framer = ({ landscape, children }: { landscape: boolean; children: ReactNode }) => {
  return (
    <div
      className={`bg-white md:w-2/3 p-2 h-fit items-center flex relative ${
        landscape ? ' md:max-w-[1000px] w-96' : ' md:max-w-[500px] w-10/12'
      }`}
    >
      {children}
    </div>
  );
};
