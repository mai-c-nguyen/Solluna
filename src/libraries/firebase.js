import React, { createContext} from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";

const FirebaseContext = createContext(null);
export { FirebaseContext };

const FirebaseProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBpWUqODeGoYz20vhtfOzzmmPzQXUCbl34",
    authDomain: "solluna-70b12.firebaseapp.com",
    databaseURL: "https://solluna-70b12-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "solluna-70b12",
    storageBucket: "solluna-70b12.appspot.com",
    messagingSenderId: "252416967080",
    appId: "1:252416967080:web:75b2b3e3d225cf80e1dd9d",
    measurementId: "G-THD5MLRPD7"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)


  const getProducts = async () => {
    return new Promise((resolve, reject) => {
      const productsRef = ref(database, 'products');
      onValue(productsRef, (snapshot) => {
        resolve(snapshot.val());
      });
    })
  };

  const getProduct = async (id) => {
    return new Promise((resolve, reject) => {
      const productRef = ref(database, 'products/' + id);
      onValue(productRef, (snapshot) => {
        resolve(Object.assign({}, snapshot.val()));
       })
    })
  }

  const getIngredients= async (id) => {
    return new Promise((resolve, reject) => {
      const ingredientsRef = ref(database, 'products/' + id + "/ingredients");
      onValue(ingredientsRef, (snapshot) => {
        resolve(Object.assign({}, snapshot.val()));
       })
    })
  }



  const firebase = {
    app,
    database,
    api: {
      getProducts,
      getProduct,
      getIngredients
    },
  };

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
