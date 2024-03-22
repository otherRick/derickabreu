import { get, getDatabase, ref, set } from 'firebase/database';
import { userAuth } from '../../../../firebase';

export const clickCounter = (imageId: string) => {
  const user = userAuth.currentUser?.displayName;
  const db = getDatabase();

  const dbRef = ref(db, `/images/${imageId}/clicks/${user}`);
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const currentCount = snapshot.val();
        const newCount = currentCount + 1;
        set(dbRef, newCount);
      } else {
        set(dbRef, 1);
      }
    })
    .catch((error) => {
      console.error('Error updating click count:', error);
    });
};
