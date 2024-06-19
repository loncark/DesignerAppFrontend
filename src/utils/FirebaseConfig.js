import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

export async function initializeFirebase() {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  try {
    const email = 'admin@admin.com';
    const password = 'password';

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User authenticated:', userCredential.user);

  } catch (error) {
    console.error('Error authenticating:', error);
    throw error; 
  }

  return { auth, storage };
}