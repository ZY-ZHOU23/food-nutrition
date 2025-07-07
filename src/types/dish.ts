import type { Food } from './usda';

export interface DishIngredient {
  food: Food;
  quantity: number;
}

export interface SavedDish {
  dishName: string;
  ingredients: DishIngredient[];
  timestamp: string;
} 