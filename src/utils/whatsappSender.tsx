export function whatsappSander(fullImage: URL) {
  const numeroTelefone = '5521973621887';
  const extractFileName = () => {
    const urlObj = new URL(fullImage as URL);
    const pathname = urlObj.pathname;
    const fileName = pathname.split('/').pop();
    return fileName || '';
  };

  const mensagem = `Gostaria de comprar esta imagem:%0A${extractFileName()}`;
  const link = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

  window.open(link, '_blank');
}
