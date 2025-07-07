import React from 'react';
import type { DishIngredient } from '../types/dish';
import type { FoodNutrient } from '../types/usda';

interface DishTotalsProps {
  ingredients: DishIngredient[];
}

const NUTRITION_IDS = {
  protein: 1003,
  fat: 1004,
  carbs: 1005,
  calories: 1008,
};

const DishTotals: React.FC<DishTotalsProps> = ({ ingredients }) => {
  const calculateTotal = (nutrientId: number) => {
    return ingredients.reduce((total, item) => {
      const nutrient = item.food.foodNutrients.find(
        (n: FoodNutrient) => n.nutrientId === nutrientId
      );
      if (nutrient) {
        // Nutrients are per 100g, so we adjust by the quantity in grams.
        const quantityMultiplier = item.quantity / 100;
        return total + nutrient.value * quantityMultiplier;
      }
      return total;
    }, 0);
  };

  const totalCalories = calculateTotal(NUTRITION_IDS.calories).toFixed(0);
  const totalProtein = calculateTotal(NUTRITION_IDS.protein).toFixed(1);
  const totalFat = calculateTotal(NUTRITION_IDS.fat).toFixed(1);
  const totalCarbs = calculateTotal(NUTRITION_IDS.carbs).toFixed(1);

  return (
    <div>
      <h3>Dish Totals</h3>
      <p>
        <strong>Calories:</strong> {totalCalories} kcal
      </p>
      <p>
        <strong>Protein:</strong> {totalProtein} g
      </p>
      <p>
        <strong>Fat:</strong> {totalFat} g
      </p>
      <p>
        <strong>Carbohydrates:</strong> {totalCarbs} g
      </p>
    </div>
  );
};

export default DishTotals; 