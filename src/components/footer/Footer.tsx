interface FooterProps {
  black?: boolean;
}

export const Footer = ({ black }: FooterProps) => {
  return (
    <div
      className={` ${
        black ? 'bg-black text-white' : 'bg-white text-black'
      } md:px-10 flex md:justify-end justify-center md:space-x-9 w-full gap-4 py-14 `}
    >
      <div className='md:text-lg'>
        <a
          href='https://www.youtube.com/channel/UCMOGRAJjOyowuyTPTqSCxiw'
          target='_blank'
          rel='noopener noreferrer'
        >
          YOUTUBE
        </a>
      </div>
      <div className='md:text-lg'>
        <a
          href='https://www.instagram.com/derick.abreu?igsh=dzQxbWJua2Y0c2Rp&utm_source=qr'
          target='_blank'
          rel='noopener noreferrer'
        >
          INSTAGRAM
        </a>
      </div>
      <div className='md:text-lg'>
        <a
          href='https://wa.me/5521973621887?text=Ol%C3%A1%2C+encontrei+o+seu+contato+atrav%C3%A9s+de+sua+pagina+na+web.+Gostaria+de+contratar+seus+servi%C3%A7os.'
          target='_blank'
          rel='noopener noreferrer'
        >
          CONTATO
        </a>
      </div>
    </div>
  );
};
