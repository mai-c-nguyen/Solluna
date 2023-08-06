import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../libraries/firebase";

export default function ProductDetailIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const params = useParams();

  const {
    api: { getIngredients },
  } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchData = async () => {
      const ingredients = await getIngredients(params.id);
      setIngredients(ingredients);
    };
    fetchData();
  }, []);

  console.log(ingredients);
  return (
    <p>
      <strong>Storage instructions:</strong> {ingredients.tea}
    </p>
  );
}
