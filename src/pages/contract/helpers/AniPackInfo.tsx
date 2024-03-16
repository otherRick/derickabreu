import { PackInfos } from '../../../components/packInfos/PackInfos';

export const AniPackInfo = {
  aniDescription:
    'Celebre o aniversário do seu filho com lembranças preciosas capturadas através da nossa oferta exclusiva de fotografia para aniversário infantil. Nosso pacote foi cuidadosamente projetado para garantir que cada momento especial seja eternizado com a mais alta qualidade e criatividade.',

  aniDetails: (
    <div className='space-y-2'>
      <PackInfos
        title='Sessão de Fotos Profissional:'
        info1=' - Uma sessão de fotografia profissional com duração média de 4 horas.'
        info2='- Fotógrafo experiente especializado em retratos infantis, garantindo capturas
          genuínas e espontâneas.'
      />
      <PackInfos
        title='Localização Personalizada:'
        info1=' - Escolha do local de acordo com suas preferências: seja em casa, em um parque, em um estúdio, ou em qualquer outro lugar especial para a família.'
        info2='- Recomendações de locais disponíveis para uma variedade de estilos e cenários.'
      />
      <PackInfos
        title='Cobertura Abrangente:'
        info1=' - Captura de momentos-chave, incluindo a chegada dos convidados, interações durante a festa, momentos de diversão, e a tão aguardada sessão de parabéns.'
        info2='- Detalhes especiais como decoração, bolo, e presentes também serão documentados.'
      />
      <PackInfos
        title='Edição Profissional:'
        info1=' - Pós-produção meticulosa para garantir que cada foto seja aprimorada e entregue com qualidade superior.'
        info2='- Retoques sutis para realçar a beleza natural das crianças e dos momentos capturados.'
      />
      <PackInfos
        title='Entrega Personalizada:'
        info1=' - Uma galeria online privada com acesso exclusivo para visualização e download das fotos.'
        info2='- Opção de entrega em formatos digitais de alta resolução ou impressões de qualidade premium.'
      />
      <PackInfos
        title='Extras Opcionais:'
        info1=' - Adicionais personalizáveis, como álbuns fotográficos impressos, convites personalizados, e quadros decorativos.'
        info2='- Pacotes de fotografia em eventos especiais como festas temáticas ou ensaios prévios ao aniversário.'
      />
      <div>
        <div className='bg-black mt-10 h-1 w-full'></div>
        <p className='font-bold text-center py-4'>Reserve Agora !</p>
        <p className='pb-10'>
          Garanta que cada sorriso, abraço e momento especial seja preservado para sempre com nossa
          oferta exclusiva de fotografia para aniversário infantil. Entre em contato hoje mesmo
          para reservar sua sessão e criar memórias inesquecíveis que durarão uma vida inteira.
        </p>
      </div>
    </div>
  )
};
