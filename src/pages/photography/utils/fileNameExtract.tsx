export function fileNameExtract(url: string) {
  const filenameWithParams = url?.substring(url.lastIndexOf('/') + 1);

  const filename = filenameWithParams?.split('?')[0];

  const imageId = filename?.slice(7).split('.')[0];

  const decoded = decodeURIComponent(imageId);
  const cleanName = decoded?.replace(/^os\//, '');

  return cleanName;
}
