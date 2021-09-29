import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: process.env.STUDENT_PANEL_FIREBASE_API_KEY,
  authDomain: process.env.STUDENT_PANEL_AUTH_DOMAIN,
  projectId: process.env.STUDENT_PANEL_PROJECT_ID,
  storageBucket: process.env.STUDENT_PANEL_STORAGE_BUCKET,
  messagingSenderId: process.env.STUDENT_PANEL_MESSAGING_SENDER_ID,
  appId: process.env.STUDENT_PANEL_APP_ID,
});

export const auth = app.auth();
export default app;
