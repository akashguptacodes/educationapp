// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Conditionally import React Native Async Storage
// let auth;
// if (typeof window !== "undefined") {
//   // Web Environment
//   auth = getAuth();
//   auth.setPersistence(browserLocalPersistence);
// } else {
//   // React Native Environment
//   import("firebase/auth").then(({ getReactNativePersistence }) => {
//     import("@react-native-async-storage/async-storage").then((AsyncStorage) => {
//       auth = initializeAuth(app, {
//         persistence: getReactNativePersistence(AsyncStorage.default),
//       });
//     });
//   });
// }

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDuv0DernvfQamoCaQtED7WsN_reC5-k6w",
//   authDomain: "learnova-d156e.firebaseapp.com",
//   projectId: "learnova-d156e",
//   storageBucket: "learnova-d156e.firebasestorage.app",
//   messagingSenderId: "623472287048",
//   appId: "1:623472287048:web:2011a40ee2bd7d71e8677d",
//   measurementId: "G-B47R0P7E96",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// const analytics = getAnalytics(app);
// export { auth };



import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuv0DernvfQamoCaQtED7WsN_reC5-k6w",
  authDomain: "learnova-d156e.firebaseapp.com",
  projectId: "learnova-d156e",
  storageBucket: "learnova-d156e.appspot.com",  
  messagingSenderId: "623472287048",
  appId: "1:623472287048:web:2011a40ee2bd7d71e8677d",
  measurementId: "G-B47R0P7E96",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); 
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
