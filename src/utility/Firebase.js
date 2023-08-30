/*eslint-disable */

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC83GzkM7GS2zUEvc5SMshKlLijT_5Y_nw",
  authDomain: "electortest.firebaseapp.com",
  databaseURL: "https://electortest-default-rtdb.firebaseio.com",
  projectId: "electortest",
  storageBucket: "electortest.appspot.com",
  messagingSenderId: "515902150100",
  appId: "1:515902150100:web:03a555e04b06507980f241",
  measurementId: "G-KPVVGNYJC3",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
