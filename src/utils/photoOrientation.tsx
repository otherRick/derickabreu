export function photoOrientation(url: string, callback: (isLandscape: boolean) => void) {
  const img = new Image();
  img.onload = () => callback(img.width > img.height);
  img.src = url;
}
