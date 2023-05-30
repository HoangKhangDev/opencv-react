import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";// Initialize Firebase
const app = initializeApp ({
    apiKey: <apiKey>,
    authDomain: <authDomain>,
    projectId: <projectId>,
    storageBucket: <storageBucket>,
    messagingSenderId: <messagingSenderId>,
    appId: <appId>,
    measurementId: <measurementId>,
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;