import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const FirebaseContext = createContext(null);
export { FirebaseContext };

const FirebaseProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyCBIDZWeES3E6Ovw_KYvuFxYaXyIgJzryU",
    authDomain: "solluna-b1875.firebaseapp.com",
    databaseURL:
      "https://solluna-b1875-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "solluna-b1875",
    storageBucket: "solluna-b1875.appspot.com",
    messagingSenderId: "726696723261",
    appId: "1:726696723261:web:1a844b1b1a3d4de4ac7b54",
    measurementId: "G-LW3G9057H8",
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const getProducts = async () => {
    return new Promise((resolve, reject) => {
      const productsRef = ref(database, "products");
      onValue(productsRef, (snapshot) => {
        resolve(snapshot.val());
      });
    });
  };

  const getProduct = async (id) => {
    return new Promise((resolve, reject) => {
      const productRef = ref(database, "products/" + id);
      onValue(productRef, (snapshot) => {
        resolve(Object.assign({}, snapshot.val()));
      });
    });
  };

  const getIngredients = async (id) => {
    return new Promise((resolve, reject) => {
      const ingredientsRef = ref(database, "products/" + id + "/ingredients");
      onValue(ingredientsRef, (snapshot) => {
        resolve(Object.assign({}, snapshot.val()));
      });
    });
  };

  const firebase = {
    app,
    database,
    api: {
      getProducts,
      getProduct,
      getIngredients,
    },
  };

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
// import React, { createContext} from "react";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue} from "firebase/database";

// const FirebaseContext = createContext(null);
// export { FirebaseContext };

// const FirebaseProvider = ({ children }) => {

//   const firebaseConfig = {
//     apiKey: "AIzaSyDMwPUT-ny5kC97wycxk7ITMSJEwY7y7ps",
//     authDomain: "solluna-tea-shop.firebaseapp.com",
//     projectId: "solluna-tea-shop",
//     storageBucket: "solluna-tea-shop.appspot.com",
//     messagingSenderId: "647585699523",
//     appId: "1:647585699523:web:e50aeed12714ff2d2f7476",
//     measurementId: "G-5P1C6GV79Y"
//   };
//   const app = initializeApp(firebaseConfig);
//   const database = getDatabase(app)

//   const getProducts = async () => {
//     return new Promise((resolve, reject) => {
//       const productsRef = ref(database, 'products');
//       onValue(productsRef, (snapshot) => {
//         resolve(snapshot.val());
//       });
//     })
//   };

//   const getProduct = async (id) => {
//     return new Promise((resolve, reject) => {
//       const productRef = ref(database, 'products/' + id);
//       onValue(productRef, (snapshot) => {
//         resolve(Object.assign({}, snapshot.val()));
//        })
//     })
//   }

//   const getIngredients= async (id) => {
//     return new Promise((resolve, reject) => {
//       const ingredientsRef = ref(database, 'products/' + id + "/ingredients");
//       onValue(ingredientsRef, (snapshot) => {
//         resolve(Object.assign({}, snapshot.val()));
//        })
//     })
//   }

//   const firebase = {
//     app,
//     database,
//     api: {
//       getProducts,
//       getProduct,
//       getIngredients
//     },
//   };

//   return (
//     <FirebaseContext.Provider value={firebase}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// };

// export default FirebaseProvider;
