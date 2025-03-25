import { Portifolio } from './components/Portifolio';
import { PrivateAlbuns } from './components/PrivateAlbuns';
import { PublicAlbuns } from './components/PublicAlbuns';

export const Photography = () => {
  return (
    <div>
      <Portifolio />
      <PublicAlbuns />
      <PrivateAlbuns />
    </div>
  );
};
