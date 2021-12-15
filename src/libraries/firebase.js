import React, { createContext} from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";

const FirebaseContext = createContext(null);
export { FirebaseContext };

const FirebaseProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDg80zYL696LS7oMVCE2PWIlfIcjXmXN5k",
    authDomain: "solluna-tea.firebaseapp.com",
    databaseURL: "https://solluna-tea-default-rtdb.firebaseio.com",
    projectId: "solluna-tea",
    storageBucket: "solluna-tea.appspot.com",
    messagingSenderId: "148765635019",
    appId: "1:148765635019:web:425506586474ab1c23c64e",
    measurementId: "G-S3HJ953Y39"
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
