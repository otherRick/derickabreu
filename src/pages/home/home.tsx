import { useEffect, useState } from 'react';
import { homeMedia } from '../../api/repository/downloadmedia';
import { Footer } from '../../components/footer/Footer';

export const Home = () => {
  const [imageUrl, setImageUrl] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await homeMedia('pa3.jpg');
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=' bg-black'>
      {imageUrl ? <img src={imageUrl} alt='Downloaded Media' /> : <p>Loading...</p>}
      <div className='bg-black py-44 px-20 space-y-8 text-gray-500'>
        <p className='md:text-6xl text-4xl'>Derick Abreu</p>
        <div className='text-lg break-words'>
          <p className='md:first: md:text-4xl text-3xl'>Fotógrafo, editor e desevolvedor</p>
          <p className='text-md'>
            brasileiro com mais de 12 anos de experiência no mercado da fotografia digital e
            domínio das pricipais ferramentas de edição e correção de imagens e{' '}
            <a className='underline' href='/about'>
              mais...
            </a>
          </p>
        </div>
        <Footer black />
      </div>
    </div>
  );
};

export default Home;
