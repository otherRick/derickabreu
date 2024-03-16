import { PackInfos } from '../../../components/packInfos/PackInfos';

export const EstPackInfo = {
  estDescription:
    'Explore a arte da fotografia em um ambiente controlado e criativo com nosso pacote exclusivo de ensaio fotográfico em estúdio interno. Projetado para capturar sua essência única, este pacote oferece uma experiência completa, desde técnicas avançadas de iluminação até orientação profissional de poses, e até mesmo a opção de serviços de maquiagem para garantir que você se sinta confiante durante toda a sessão.',

  estDetails: (
    <div className='space-y-2'>
      <PackInfos
        title='Consultoria Pré-Sessão:'
        info1=' - Uma consulta inicial para discutir suas expectativas, preferências de estilo, e qualquer ideia específica que você tenha para a sessão.'
        info2='- Recomendações personalizadas para a seleção de roupas, acessórios e maquiagem para complementar sua aparência e atingir o visual desejado.'
      />
      <PackInfos
        title='Sessão de Fotografia Profissional:'
        info1=' - Sessão de fotos em estúdio com duração de 4 horas, conduzida por um fotógrafo experiente em técnicas de iluminação e direção de modelos.'
        info2='- Utilização de equipamentos de última geração para garantir resultados de alta qualidade, incluindo diferentes fontes de luz para criar efeitos dramáticos e artísticos.'
      />
      <PackInfos
        title='Orientação de Poses e Expressões:'
        info1=' - Direção profissional durante toda a sessão para garantir que você se sinta confortável e confiante diante da câmera.'
        info2='- Sugestões de poses e expressões que ressaltem sua beleza natural e transmitam sua personalidade única.'
      />
      <PackInfos
        title='Maquiagem Profissional (Opcional):'
        info1=' - Serviço de maquiagem oferecido por um profissional experiente para realçar seus traços faciais e garantir uma aparência impecável nas fotos.'
        info2='- Opções de maquiagem que variam desde looks naturais e sutis até estilos mais ousados e glamourosos, de acordo com suas preferências.'
      />
      <PackInfos
        title='Edição e Entrega de Fotos:'
        info1=' - Pós-produção cuidadosa e refinada para aprimorar cada imagem, garantindo uma aparência impecável e profissional.'
        info2='- Entrega das fotos em formato digital de alta resolução, proporcionando a você a liberdade de imprimir, compartilhar e preservar suas memórias de forma duradoura.'
      />
      <PackInfos
        title='Extras Personalizáveis:'
        info1=' - Opção de adicionar álbuns fotográficos impressos, ampliações de parede e outros produtos personalizados para exibir suas fotos de forma elegante e sofisticada.'
        info2='- Pacotes adicionais disponíveis para sessões temáticas, fotos em grupo ou projetos especiais.'
      />
      <div className='bg-black my-10 h-1 w-full'></div>
      <p className='font-bold text-center py-4'>Reserve Agora !</p>
      <p className='pb-10'>
        Desperte sua criatividade e celebre sua beleza única com uma experiência de ensaio
        fotográfico em estúdio internamente. Entre em contato hoje mesmo para agendar sua sessão e
        deixe-nos capturar sua essência de uma forma verdadeiramente memorável e inspiradora.
      </p>
    </div>
  )
};
