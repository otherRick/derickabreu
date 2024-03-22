export const Unloged = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center px-10 h-full gap-40 '>
        <button className='bg-white p-2 rounded-md' onClick={onEnter}>
          Entrar
        </button>
        <p className='text-white text-xl text-center '>
          Logado com o seu perfil do cliente você terá <br className='hidden md:block' /> acesso a
          áreas <span className='text-yellow-100'>exclusivas </span> do site além de outros
          beneficios.
        </p>
      </div>
    </>
  );
};
