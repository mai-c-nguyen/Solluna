import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../libraries/firebase";
import { IIngredient } from "../interfaces/IIngredient";

export default function ProductDetailIngredients() {
  const [ingredients, setIngredients] = useState<IIngredient>();
  const { id } = useParams<{ id: string }>();

  const firebaseContext = useContext(FirebaseContext);

  if (!firebaseContext) {
    throw new Error("FirebaseContext is null");
  }

  const {
    api: { getIngredients },
  } = firebaseContext;

  useEffect(() => {
    const fetchData = async () => {
      const ingredients = await getIngredients(id);
      setIngredients(ingredients);
    };
    fetchData();
  }, [getIngredients, id]);

  return (
    <p>
      <strong>Storage instructions:</strong> {ingredients && ingredients.tea}
    </p>
  );
}
