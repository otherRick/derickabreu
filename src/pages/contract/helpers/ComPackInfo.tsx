import { PackInfos } from '../../../components/packInfos/PackInfos';

export const ComPackInfo = {
  comDescription:
    'Capture momentos de alegria, emoção e celebração com nosso pacote exclusivo de fotografia para eventos festivos. Nossa equipe dedicada oferece uma cobertura abrangente, desde a captura de imagens espontâneas até poses cuidadosamente orientadas, garantindo que cada detalhe seja registrado com precisão e estilo. Com recursos de pontualidade e conectividade Wi-Fi para envio instantâneo de fotos às redes sociais, sua festa se tornará ainda mais memorável e compartilhável.',

  comDetails: (
    <div className='space-y-2'>
      <PackInfos
        title='Cobertura Abrangente:'
        info1=' - Cobertura fotográfica completa do evento, desde a chegada dos convidados até os momentos finais de despedida.'
        info2='- Captura de momentos espontâneos, risos, abraços e interações, bem como poses direcionadas para fotos formais e descontraídas.'
      />
      <PackInfos
        title='Atuação e Interação Profissional:'
        info1=' - Fotógrafo profissional altamente qualificado e experiente, interagindo de forma amigável e discreta com os convidados para capturar os melhores momentos.'
        info2='- Abordagem atenciosa e empática para garantir que todos se sintam à vontade diante da câmera, resultando em fotos naturais e genuínas.'
      />
      <PackInfos
        title='Envio de Fotos em Tempo Real por Wi-Fi:'
        info1=' - Recurso de conectividade Wi-Fi para enviar fotos em tempo real, permitindo que os convidados compartilhem instantaneamente às redes sociais os momentos especiais do evento.'
        info2='- Possibilidade de criar hashtags personalizadas para facilitar a organização e a identificação das fotos nas mídias sociais.'
      />
      <PackInfos
        title='Pontualidade e Profissionalismo:'
        info1=' - Chegada pontual do fotógrafo para garantir uma cobertura completa e sem interrupções do evento.'
        info2='- Profissionalismo exemplar em todas as interações com os clientes e os convidados, garantindo uma experiência tranquila e satisfatória para todos.'
      />
      <PackInfos
        title='Edição Profissional e Entrega Rápida:'
        info1=' - Pós-produção cuidadosa das imagens para realçar cores, corrigir imperfeições e garantir uma qualidade visual excepcional.'
        info2='- Entrega rápida das fotos em formato digital de alta resolução, permitindo que os clientes revivam e compartilhem os momentos especiais do evento em pouco tempo.'
      />
      <PackInfos
        title='Extras Personalizáveis:'
        info1=' - Opção de adicionar serviços adicionais, como álbuns fotográficos impressos, montagens digitais, ou ampliações de parede para preservar as lembranças de forma duradoura.'
        info2='- Pacotes personalizados disponíveis para atender às necessidades específicas do evento e dos clientes.'
      />
      <div>
        <div className='bg-black mt-10 h-1 w-full'></div>
        <p className='font-bold text-center py-4'>Reserve Agora !</p>
        <p className='pb-10'>
          Deixe-nos capturar a essência e a emoção da sua celebração com nossa cobertura
          fotográfica de eventos festivos. Entre em contato hoje mesmo para reservar seu pacote e
          garanta memórias inesquecíveis que serão apreciadas por muitos anos vindouros.
        </p>
      </div>
    </div>
  )
};
