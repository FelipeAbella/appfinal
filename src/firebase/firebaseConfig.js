import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA63C_QW6Yy7fFXlAdLFcmbOfErLcwfLjA",
  authDomain: "iot-proyectoc3.firebaseapp.com",
  databaseURL: "https://iot-proyectoc3-default-rtdb.firebaseio.com",
  projectId: "iot-proyectoc3",
  storageBucket: "iot-proyectoc3.appspot.com",
  messagingSenderId: "730608207637",
  appId: "1:730608207637:web:bf2e037dd0a9472e284b1c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);