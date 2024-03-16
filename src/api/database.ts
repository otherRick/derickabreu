import { getStorage } from 'firebase/storage';
import { appFire } from '../../firebase';

export const bucket = getStorage(appFire);
