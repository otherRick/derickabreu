import { Footer } from '../../components/footer/Footer';
import { BugetCard } from '../../components/buget/BugetCard';
import { useEffect, useState } from 'react';
import { WaForm } from '../../components/modals/WaForm/Waform';
import { BCinfo } from './helpers/BCInfo';
import { DetailsModal } from '../../components/modals/detailsModal/DetailsModal';

export const Contract = () => {
  const [choosen, setChoosen] = useState({
    alt: '',
    description: '',
    details: '',
    title: '',
    url: 'a'
  });
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  return (
    <>
      <WaForm choosen={choosen.title} showModal={showModal} onCancel={() => setShowModal(false)} />
      <DetailsModal
        closeModal={() => setOpenModal(false)}
        openModal={openModal}
        url={choosen.url}
        alt={choosen.alt}
        title={choosen.title}
        description={choosen.description}
        details={choosen.details}
      />
      <div className='space-y-10'>
        <div className='md:px-20 space-y-10 '>
          <div>
            <p className='text-xs md:text-left text-center'>
              Veja informações detalhadas do produto e
            </p>
            <p className='text-lg md:text-left text-center'>Solicite um orçamento !</p>
          </div>
          <div className=' md:grid-cols-3 md:grid gap-20'>
            {BCinfo.map(({ alt, description, details, title, url }, index) => {
              return (
                <BugetCard
                  alt={alt}
                  description={description}
                  details={details}
                  onSeeMore={(e) => {
                    setChoosen({ title: e, url, alt, description, details });
                    setOpenModal(true);
                  }}
                  onClick={(e) => {
                    setShowModal(true);
                    setChoosen({ title: e, url, alt, description, details });
                  }}
                  title={title}
                  url={url}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <Footer black />
      </div>
    </>
  );
};
