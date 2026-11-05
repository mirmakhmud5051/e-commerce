import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDz6fwsdd_a6YQhLOFmQd8psG-S4gUSpNE',
  authDomain: 'exclusive-7a83c.firebaseapp.com',
  projectId: 'exclusive-7a83c',
  storageBucket: 'exclusive-7a83c.firebasestorage.app',
  messagingSenderId: '541228149751',
  appId: '1:541228149751:web:eeac4fbd05cdb711cc1cf2',
  measurementId: 'G-VC3CSN5R2M',
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics faqat production buildda, brauzer qo‘llab-quvvatlasa ishlaydi.
if (import.meta.env.PROD) {
  import('firebase/analytics').then(async ({ getAnalytics, isSupported }) => {
    if (await isSupported()) getAnalytics(app);
  }).catch(() => { /* Analytics yuklanmasa ham do‘kon ishlaydi. */ });
}
