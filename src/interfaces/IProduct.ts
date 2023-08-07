import { IIngredient } from "./IIngredient";

export interface IProduct {
  description: string;
  id: string;
  image: string;
  name: string;
  ingredients: IIngredient[];
  price: number;
  price_id: string;
  servings: string;
}
