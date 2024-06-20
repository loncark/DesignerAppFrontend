import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig, adminEmail, adminPassword } from './config';

export async function initializeFirebase() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log('Admin authenticated');

  } catch (error) {
    console.error('Error authenticating:', error);
    throw error; 
  }

  return { auth, storage };
}