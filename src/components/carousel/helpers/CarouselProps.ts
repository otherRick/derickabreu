import { photosession } from '../../../pages/photography/helpers/photosession';

export interface CarouselProps {
  selectedImage: boolean;
  src: string | URL | Request | undefined | Promise<Response>;
  imageUrls: string[];
  onBuyItemClick: () => void;
  foundAlbum: (typeof photosession)[number] | undefined;
  downloadImage: () => void;
  onClose: () => void;
  alt: string;
  payToview: boolean;
}
