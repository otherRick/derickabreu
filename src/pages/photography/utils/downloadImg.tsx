import { fileNameExtract } from './fileNameExtract';

export async function downloadIgm(url: string) {
  const cleanName = fileNameExtract(url);
  try {
    const response = await fetch(url as string);
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = cleanName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Download failed:', error);
  }
}
