import { ImageFileProps } from '../../../api/repository/downloadmedia';
import { photosession } from '../../../pages/photography/helpers/photosession';

export interface selectedImageProps {
  url: string | URL | Request | undefined | Promise<Response>;
  name: string;
  alt: string;
}
export interface CarouselProps {
  open: boolean;
  selectedImage?: ImageFileProps;
  allImgData: ImageFileProps[];
  foundAlbum: (typeof photosession)[number] | undefined;
  downloadImage: () => void;
  onClose: () => void;
  payToview: boolean;
}
