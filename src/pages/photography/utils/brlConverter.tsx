export const brlConverter = (value?: number) => {
  const brlChange = value?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return brlChange;
};
