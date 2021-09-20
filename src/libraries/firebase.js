import { createContext} from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child, get} from "firebase/database";

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


  const getProducts = () => {
    const productsRef = ref(database, 'products');
    const productsData = [];
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      data.map(product => productsData.push(product));
    });
    return productsData;
  };

  const getProduct = (id) => {
    // const databaseRef = ref(getDatabase());
    // const product = {};
    // get(child(databaseRef, `products/${id}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const data = snapshot.val();
    //     return Object.assign(product, data);
    //     };
    //   });
    // return product;

      const productRef = ref(database, 'products/' + id);
      const product = {};
      onValue(productRef, (snapshot) => {
        const data = snapshot.val();
        return Object.assign(product, data);
       })
      return product;
      console.log(product);
    }


  const firebase = {
    app,
    database,
    api: {
      getProducts,
      getProduct
    },
  };

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
