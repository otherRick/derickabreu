import { useEffect, useState } from 'react';

export const WaForm = ({
  choosen,
  showModal,
  onCancel
}: {
  choosen: string;
  showModal: boolean;
  onCancel: () => void;
}) => {
  const [answers, setAnswers] = useState({
    Name: '',
    Where: '',
    When: '',
    HowLong: '',
    How: '',
    Payment: ''
  });

  const enviarWhatsApp = () => {
    const numeroTelefone = '5521973621887'; // Substitua pelo número de telefone desejado
    const mensagem = `Olá fotógrafo, tudo bem? \n \n Me chamo ${answers.Name} e eu gostaria de um orçamento para o *${choosen}* que acontecerá no dia ${answers.When} em ${answers.Where}.\n \n O tempo necessário de trabalho do fotógrafo será de ${answers.HowLong}.\n \n O pagamento será em ${answers.Payment} e eu gostaria de receber as fotos por ${answers.How}. \n\n Obrigado pela atenção. Aguardo sua resposta o quando antes seu lindo.`; // Substitua pela mensagem desejada
    const link = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(link, '_blank');
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  return (
    <div
      style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)' }}
      className={`bg-red-200 w-full h-full absolute top-0 justify-center flex items-center ${
        !showModal ? 'hidden' : ''
      }`}
    >
      <div
        className={`bg-zinc-200 fixed z-20 w-11/12 rounded-md shadow-xl shadow-black  ${
          !showModal ? 'hidden' : ''
        }`}
      >
        <div className=' justify-between flex flex-col p-6'>
          <div className='my-5'>
            <p className='font-bold'>{choosen}</p>
            <p>Solicitação de orçamento.</p>
            <div className='flex'>
              <span className='text-red-500 text-xl'>* </span>{' '}
              <p className='text-xs'> campo obrigatório. </p>
            </div>
          </div>
          <div className='flex flex-col gap-8 mb-10'>
            <div>
              <div className='flex'>
                <p>Nome ?</p>
                <span className='text-red-500 text-xl'>* </span>{' '}
              </div>
              <input
                onChange={(e) => setAnswers({ ...answers, Name: e.target.value })}
                className='w-full'
                title='name'
                type='text'
              />
            </div>
            <div>
              <div className='flex'>
                <p>Enderço do evento ?</p>
                <span className='text-red-500 text-xl'>* </span>{' '}
              </div>
              <input
                onChange={(e) => setAnswers({ ...answers, Where: e.target.value })}
                className='w-full'
                title='Enderço'
                type='text'
              />
            </div>
            <div>
              <div className='flex'>
                <p>Que dia acontecerá ?</p>
                <span className='text-red-500 text-xl'>* </span>{' '}
              </div>
              <input
                onChange={(e) => setAnswers({ ...answers, When: e.target.value })}
                className='w-full'
                title='Dia'
                type='text'
              />
            </div>
            <div>
              <div className='flex'>
                <p>Quanto tempo de fotografia será nescessário ?</p>
                <span className='text-red-500 text-xl'>* </span>{' '}
              </div>
              <input
                onChange={(e) => setAnswers({ ...answers, HowLong: e.target.value })}
                className='w-full'
                title='Quanto tempo de fotografia será nescessário ?'
                type='text'
              />
            </div>
            <div>
              <p>Como você gostaria de receber as imagens ?</p>
              <input
                onChange={(e) => setAnswers({ ...answers, How: e.target.value })}
                className='w-full'
                title='Como você gostaria de receber as imagens ?'
                type='text'
              />
            </div>
            <div>
              <p>Qual a forma de pagamento ?</p>
              <input
                onChange={(e) => setAnswers({ ...answers, Payment: e.target.value })}
                className='w-full'
                title='Qual a forma de pagamento ?'
                type='text'
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <button
              className='bg-red-100 border rounded-md border-black py-2 px-10'
              title='Cancel'
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className={`${
                answers.Name && answers.When && answers.Where && answers.HowLong
                  ? 'bg-green-100'
                  : 'bg-grey-100'
              }  border border-black rounded-md py-2 px-10`}
              name='Enviar'
              title='Send'
              onClick={enviarWhatsApp}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
