export function whatsappSander(fileName: string) {
  const numeroTelefone = '5521973621887';

  const mensagem = `Gostaria de comprar esta imagem:%0A${fileName}`;
  const link = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

  window.open(link, '_blank');
}
