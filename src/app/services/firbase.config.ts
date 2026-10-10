import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseInit = {
  apiKey: 'AIzaSyBxKpGTqp0U6rbAyqNLiG4_4ISU35w2Ir8',
  authDomain: 'areekh-alomdah.firebaseapp.com',
  databaseURL: 'https://areekh-alomdah-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'areekh-alomdah',
  storageBucket: 'areekh-alomdah.firebasestorage.app',
  messagingSenderId: '834927257867',
  appId: '1:834927257867:web:6bdf1432d568fdfcc41a0e',
  measurementId: 'G-27XW7762L1',
};

export const firebaseApp = initializeApp(firebaseInit);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider('6Ldx4ectAAAAAOhNE9SQW7D651pgVcOKzeORSHsk'),
  isTokenAutoRefreshEnabled: true,
});
