import { PackInfos } from '../../../components/packInfos/PackInfos';

export const ExtPackInfo = {
  extDescription:
    'Explore a beleza natural do mundo ao ar livre e crie memórias eternas com nosso pacote exclusivo de ensaio fotográfico externo. Projetado para capturar sua essência única em cenários deslumbrantes, esta experiência oferece uma fusão perfeita de técnicas avançadas de iluminação, cores vibrantes e orientação profissional de poses, tudo enquanto aproveita ao máximo a luz natural e os cenários externos.',

  extDetails: (
    <div className='space-y-2'>
      <PackInfos
        title='Consultoria Pré-Sessão:'
        info1=' - Uma consulta inicial para discutir suas preferências, estilo e visão para a sessão fotográfica externa.'
        info2='- Orientações personalizadas sobre seleção de locais, roupas e acessórios para complementar o cenário e criar o ambiente desejado.'
      />
      <PackInfos
        title='Seleção de Local Adequado:'
        info1=' - Escolha de um local externo adequado que reflita sua personalidade e se alinhe à estética visual desejada para a sessão.'
        info2='- Sugestões de locais deslumbrantes, como parques, praias, jardins botânicos, ruas charmosas da cidade, entre outros.'
      />
      <PackInfos
        title='Sessão Fotográfica Profissional:'
        info1=' - Sessão de fotos externa com duração de tempo abrangente, liderada por um fotógrafo experiente em técnicas de iluminação natural e composição ao ar livre.'
        info2='- Utilização criativa da luz natural para criar efeitos dramáticos e realçar a beleza dos cenários e dos modelos.'
      />
      <PackInfos
        title='Orientação de Poses e Expressões:'
        info1=' - Direção profissional durante toda a sessão para garantir que você se sinta à vontade e confiante diante da câmera.'
        info2='- Sugestões de poses naturais e expressões autênticas que capturem sua personalidade e espontaneidade.'
      />
      <PackInfos
        title='Maquiagem Profissional (Opcional):'
        info1=' - Serviço de maquiagem disponível para garantir que você esteja deslumbrante e radiante durante a sessão fotográfica externa.'
        info2='- Maquiagem adaptada ao ambiente externo para um visual fresco, natural e duradouro.'
      />
      <PackInfos
        title='Extras Opcionais:'
        info1=' - Pós-produção meticulosa para aprimorar cada imagem, ressaltando cores vibrantes e detalhes impressionantes.'
        info2='- Entrega das fotos em formato digital de alta resolução, permitindo que você as compartilhe, imprima e preserve suas memórias de forma duradoura.'
      />
      <div>
        <div className='bg-black mt-10 h-1 w-full'></div>
        <p className='font-bold text-center py-4'>Reserve Agora !</p>
        <p className='pb-10'>
          Explore a liberdade e a beleza da natureza enquanto capturamos sua essência em uma sessão
          fotográfica externa inesquecível. Entre em contato hoje mesmo para agendar sua sessão e
          deixe-nos criar imagens que refletem sua verdadeira beleza e personalidade em meio aos
          cenários deslumbrantes da mãe natureza.
        </p>
      </div>
    </div>
  )
};
