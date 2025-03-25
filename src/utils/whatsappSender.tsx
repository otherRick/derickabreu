export function whatsappSander(fileName: string | undefined) {
  const numeroTelefone = '5521973621887';

  const mensagem = `Olá fotógrafo, como vai?%0A${fileName}`;
  const link = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagem}`;

  window.open(link, '_blank');
}
