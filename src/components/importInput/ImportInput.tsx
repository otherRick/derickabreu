import { PencilSimple } from '@phosphor-icons/react';
import { ChangeEvent } from 'react';

interface ImageUploadProps {
  onImageSelect: (image: File) => void;
}

const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id='image-upload'
      />
      <label htmlFor='image-upload'>
        <div className='flex text-white gap-1 items-center rounded-md text-xs'>
          <PencilSimple size={16} />
          <p>Editar</p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
