import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOvzTPzonKQ3L5Vn1fGHYCgQvji9xr6zg",
  authDomain: "typing-speed-test-app-787c3.firebaseapp.com",
  projectId: "typing-speed-test-app-787c3",
  storageBucket: "typing-speed-test-app-787c3.appspot.com",
  messagingSenderId: "778696651942",
  appId: "1:778696651942:web:279d2a17068f017cb27067",
  measurementId: "G-N22ECK2PR3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
