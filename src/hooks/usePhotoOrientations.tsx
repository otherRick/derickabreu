import { useState, useEffect } from 'react';

export function usePhotoOrientation(url: string) {
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.onload = () => setIsLandscape(img.width > img.height);
    img.src = url;
  }, [url]);

  return isLandscape;
}
