export const extractFileName = (fullImage: string) => {
  const urlObj = new URL(fullImage);
  const pathname = urlObj.pathname;
  const fileName = pathname.split('/').pop();
  return fileName || '';
};
