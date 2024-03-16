import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB1_ZxOl551pzufio9UirXDZ_KDIMh8apw',
  authDomain: 'portfoto-ac408.firebaseapp.com',
  projectId: 'portfoto-ac408',
  storageBucket: 'portfoto-ac408.appspot.com',
  messagingSenderId: '145742035389',
  appId: '1:145742035389:web:331b477212d6b18955fad4',
  measurementId: 'G-Z4PP46RSYT'
};

export const appFire = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFire);
