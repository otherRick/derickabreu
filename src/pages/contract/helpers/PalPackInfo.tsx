import { PackInfos } from '../../../components/packInfos/PackInfos';

export const PalPackInfo = {
  palDescription:
    'Imortalize momentos inesquecíveis e performances deslumbrantes com nosso pacote especializado de cobertura de eventos de palco. Nossa equipe de fotografia tem uma vasta experiência em capturar a energia e a emoção de apresentações teatrais, shows, danças e concertos, contando com equipamentos de ponta para captura à distância e acesso privilegiado aos bastidores. Confie em nós para documentar cada instante, desde os momentos épicos no palco até os bastidores repletos de história e camaradagem artística.',

  palDetails: (
    <div className='space-y-2'>
      <PackInfos
        title='Consultoria Pré-Evento:'
        info1=' - Uma reunião inicial para discutir os detalhes do evento, incluindo horários, locais, e quaisquer solicitações especiais.'
        info2='- Análise do cronograma do evento para garantir uma cobertura abrangente e eficiente.'
        info3='- Presença nos ensaio e planejamentos da apresentação para garantir o melhor posicionamento e captura'
      />
      <PackInfos
        title='Equipe Especializada em Eventos de Palco:'
        info1=' - Fotógrafos altamente qualificados e experientes em capturar performances ao vivo e momentos emocionantes em palco.'
        info2='- Conhecimento aprofundado em técnicas de captura de movimento, iluminação teatral e composição dinâmica.'
      />
      <PackInfos
        title='Equipamento de Alta Qualidade:'
        info1=' - Utilização de equipamentos de última geração, incluindo câmeras de alta resolução, lentes especializadas e acessórios para captura à distância.'
        info2='- Capacidade de fotografar em condições de pouca luz sem comprometer a qualidade da imagem, garantindo resultados impressionantes mesmo em ambientes desafiadores.'
      />
      <PackInfos
        title='Acesso aos Bastidores:'
        info1=' - Acesso exclusivo aos bastidores para capturar momentos íntimos e autênticos dos artistas antes, durante e após as apresentações.'
        info2='- Documentação dos preparativos, ensaios, interações entre os artistas e momentos de concentração nos bastidores.'
      />
      <PackInfos
        title='Cobertura Abrangente:'
        info1=' - Captura de todas as fases do evento, desde a preparação e os ensaios até as performances principais e os momentos finais de aplausos.'
        info2='- Fotografia de artistas individuais, grupos, cenários e elementos visuais que fazem parte do espetáculo.'
      />
      <PackInfos
        title='Edição Profissional e Entrega de Fotos:'
        info1=' - Pós-produção cuidadosa para realçar a qualidade visual e a emoção de cada imagem.'
        info2='- Entrega rápida e conveniente das fotos em formato digital de alta resolução, prontas para compartilhar, imprimir e preservar.'
      />

      <div>
        <div className='bg-black mt-10 h-1 w-full'></div>

        <p className='font-bold text-center py-4'>Reserve Agora !</p>
        <p className='pb-10'>
          Confie em nossa experiência e paixão pela arte para capturar a essência e a energia de
          seu próximo evento de palco. Entre em contato hoje mesmo para garantir uma cobertura
          fotográfica excepcional que irá preservar os momentos mais memoráveis e emocionantes do
          seu espetáculo.
        </p>
      </div>
    </div>
  )
};
