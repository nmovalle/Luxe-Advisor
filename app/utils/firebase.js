import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCRwTSfQ2N_iCaIfuOgm2u2aDFjMKqff0c",
    authDomain: "luxe-advisor.firebaseapp.com",
    projectId: "luxe-advisor",
    storageBucket: "luxe-advisor.appspot.com",
    messagingSenderId: "387936458543",
    appId: "1:387936458543:web:9c7035e30a451f3aa6f3da"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);