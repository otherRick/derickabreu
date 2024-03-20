// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Footer } from '../../components/footer/Footer';
import { BugetCard } from '../../components/buget/BugetCard';
import { useEffect, useState } from 'react';
import { WaForm } from '../../components/modals/WaForm/Waform';
import { BCinfo } from './helpers/BCInfo';
import { DetailsModal } from '../../components/modals/detailsModal/DetailsModal';
import ReactGA from 'react-ga';

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

  const ga = () => {
    ReactGA.event({
      category: 'Botões',
      action: 'Clique no botão de download',
      label: 'Nome do botão'
    });
  };

  return (
    <section className='w-full flex flex-col justify-center items-center'>
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
      <div className='md:px-20 space-y-10 w-fit '>
        <div className='space-y-10 w-full flex flex-col justify-center items-center '>
          <div className=' w-full flex flex-col md:items-start'>
            <p className='text-xs md:text-left text-center'>
              Veja informações detalhadas do produto e
            </p>
            <p className='text-lg md:text-left text-center'>Solicite um orçamento !</p>
          </div>
          <div className=' md:grid-cols-3 md:grid gap-20 '>
            {BCinfo.map(({ alt, description, details, title, url }, index) => {
              return (
                <BugetCard
                  alt={alt}
                  description={description}
                  details={details}
                  onSeeMore={(e) => {
                    setChoosen({ title: e, url, alt, description, details });
                    setOpenModal(true);
                    ga;
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
      </div>
      <div className='w-full'>
        <Footer black />
      </div>
    </section>
  );
};
