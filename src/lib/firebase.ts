// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  projectId: "konsalting-ts",
  // Add other config values if needed for your project
  // You can find these in Firebase Console > Project Settings > General
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Functions
export const functions = getFunctions(app);

export default app;
