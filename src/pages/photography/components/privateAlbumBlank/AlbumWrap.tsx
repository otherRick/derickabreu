import { useLocation, useNavigate } from 'react-router-dom';

import { photosession } from '../../helpers/photosession';
import { FolderArrowDownIcon } from '@heroicons/react/24/outline';
import { CartDropdown } from '../../../../components/dropdowns/CartDropdown';
import { ReactNode } from 'react';
import { CustomFlowbiteTheme, Dropdown, DropdownItem } from 'flowbite-react';

interface doenloadFolderLinkProps {
  alta?: string;
  media?: string;
  baixa?: string;
}

export const AlbumWrap = ({
  children,
  album,
  payToview,
  downloadFolderLink
}: {
  children: ReactNode;
  album: string | undefined;
  payToview: boolean;
  downloadFolderLink: doenloadFolderLinkProps;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlLength = location.pathname.split('/').length;
  const decodedAlbumName = decodeURIComponent(location.pathname.split('/')[urlLength - 1]);
  const foundAlbum = photosession.find((item) => item.album === decodedAlbumName);

  const customTheme: CustomFlowbiteTheme = {
    dropdown: {
      arrowIcon: 'hidden',
      content: 'py-1 focus:outline-none p-4 '
    }
  };

  return (
    <div className='w-full'>
      <div className='bg-zinc-100 py-10 flex justify-center'>
        <div className='items-center flex w-1/3 justify-center'>
          <button className='underline' onClick={() => navigate(-1)}>
            voltar
          </button>
        </div>
        <div className='items-center flex w-1/3 justify-center'>
          <p>{album ? album : foundAlbum?.album}</p>
        </div>
        <div className={`items-center flex w-1/3 justify-center flex-col`}>
          {payToview ? (
            <div>
              <CartDropdown album={foundAlbum} />
            </div>
          ) : (
            <Dropdown
              style={{ backgroundColor: 'transparent' }}
              theme={customTheme.dropdown}
              label={
                <div className='flex items-center'>
                  <FolderArrowDownIcon className=' text-zinc-400 hover:text-zinc-800  w-12 h-12 p-2 cursor-pointer' />
                  <p className='text-zinc-400'>Baixar pasta</p>
                </div>
              }
            >
              <Dropdown.Header>Resolução:</Dropdown.Header>

              <DropdownItem className={`${!downloadFolderLink.alta && 'hidden'}`}>
                <a target='_blank' rel='noopener noreferrer' href={downloadFolderLink.alta}>
                  Alta
                </a>
              </DropdownItem>
              <DropdownItem className={`${!downloadFolderLink.media && 'hidden'}`}>
                <a target='_blank' rel='noopener noreferrer' href={downloadFolderLink.media}>
                  Média
                </a>
              </DropdownItem>
              <DropdownItem className={`${!downloadFolderLink.baixa && 'hidden'}`}>
                <a target='_blank' rel='noopener noreferrer' href={downloadFolderLink.baixa}>
                  Baixa
                </a>
              </DropdownItem>
            </Dropdown>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
