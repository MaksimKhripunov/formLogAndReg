import { createApp } from 'vue'
import App from './App.vue'


const app= createApp(App);
app.use(router);
app.mount('#app');


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import router from "@/router";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYmXPsijEXm_xV9EjJ7GIICZAjok__Qo8",
    authDomain: "vue-lab3.firebaseapp.com",
    projectId: "vue-lab3",
    storageBucket: "vue-lab3.appspot.com",
    messagingSenderId: "48043365958",
    appId: "1:48043365958:web:cd965e47fc18bc29bbdc47",
    measurementId: "G-HCVJ3EBRW3"
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const db=getFirestore(app1);
export {db}
