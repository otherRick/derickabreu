import { ArrowUp } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showScrollTop ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='fixed bottom-20 right-5 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-700 transition-all flex items-center gap-2 animate-bounce'
    >
      <ArrowUp />
      <p>voltar</p>
    </button>
  ) : null;
};
