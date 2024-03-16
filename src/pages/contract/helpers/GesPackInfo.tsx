import { PackInfos } from '../../../components/packInfos/PackInfos';

export const GesPackInfo = {
  gesDescription:
    'Celebre o momento mais especial da sua vida com nosso pacote exclusivo de ensaio fotográfico de gestante, projetado para capturar a beleza, a serenidade e a alegria da maternidade. Combinando técnicas avançadas de iluminação, cores vibrantes e orientação profissional de poses, nossa equipe de fotografia proporcionará uma experiência memorável, seja em um ambiente interno ou externo. Aproveite ao máximo a luz natural e os cenários deslumbrantes enquanto nos concentramos em criar imagens que encapsulem a magia desse momento único na sua vida.',

  gesDetails: (
    <div className='space-y-2'>
      <PackInfos
        title='Consultoria Pré-Sessão:'
        info1=' - Uma consulta inicial para entender suas expectativas, preferências de estilo e visão para a sessão fotográfica de gestante.'
        info2='- Orientações personalizadas sobre a seleção do local, roupas e acessórios para garantir uma experiência verdadeiramente única e significativa.'
      />
      <PackInfos
        title='Seleção de Local Adequado:'
        info1=' - Opção de realizar a sessão fotográfica em um ambiente interno, como em sua casa, ou externo, em um local naturalmente belo que complemente sua visão para as fotos.'
        info2='- Sugestões de locais pitorescos, como parques, praias, jardins botânicos, ou até mesmo um estúdio fotográfico profissional, dependendo de suas preferências.'
      />
      <PackInfos
        title='Sessão Fotográfica Profissional:'
        info1=' - Sessão de fotos com duração de tempo abrangente, liderada por um fotógrafo experiente em fotografia de gestante.'
        info2='- Utilização criativa da luz natural e artificial para criar uma atmosfera suave, delicada e envolvente que realce sua beleza materna.'
      />
      <PackInfos
        title='Orientação de Poses e Expressões:'
        info1=' - Direção profissional durante toda a sessão para garantir que você se sinta confortável, confiante e relaxada diante da câmera.'
        info2='- Sugestões de poses naturais e expressões serenas que capturem a essência e a conexão emocional desse momento especial.'
      />
      <PackInfos
        title='Maquiagem Profissional (Opcional):'
        info1=' - Serviço de maquiagem disponível para realçar sua beleza natural e garantir que você se sinta radiante e deslumbrante durante a sessão.'
        info2='- Maquiagem adaptada para um visual suave, natural e duradouro que complemente sua aparência e estilo pessoal.'
      />
      <PackInfos
        title='Edição e Entrega de Fotos:'
        info1=' - Pós-produção cuidadosa para aprimorar cada imagem, realçando cores, texturas e detalhes de forma sutil e elegante.'
        info2='- Entrega das fotos em formato digital de alta resolução, permitindo que você compartilhe, imprima e preserve essas lembranças preciosas para as gerações futuras.'
      />
      <div>
        <div className='bg-black mt-10 h-1 w-full'></div>
        <p className='font-bold text-center py-4'>Reserve Agora !</p>
        <p className='pb-10'>
          Desfrute de uma experiência relaxante e emocionante enquanto capturamos a beleza e a
          magia da sua gravidez em uma sessão fotográfica de gestante verdadeiramente memorável.
          Entre em contato hoje mesmo para agendar sua sessão e deixe-nos criar imagens que serão
          tesouros para toda a vida, celebrando esse momento especial na sua jornada para a
          maternidade.
        </p>
      </div>
    </div>
  )
};
