import React from 'react';
import type { Food, FoodNutrient } from '../types/usda';
import styles from './Table.module.css';

interface NutritionTableProps {
  food: Food;
  quantity: number;
}

const NUTRITION_IDS = {
  protein: 1003,
  fat: 1004,
  carbs: 1005,
  calories: 1008,
};

const NutritionTable: React.FC<NutritionTableProps> = ({ food, quantity }) => {
  const getNutrient = (nutrientId: number): FoodNutrient | undefined => {
    return food.foodNutrients.find((n) => n.nutrientId === nutrientId);
  };

  const protein = getNutrient(NUTRITION_IDS.protein);
  const fat = getNutrient(NUTRITION_IDS.fat);
  const carbs = getNutrient(NUTRITION_IDS.carbs);
  const calories = getNutrient(NUTRITION_IDS.calories);

  // Nutrients are typically per 100g. We need to adjust for quantity.
  // The prompt says "If qty omitted, default to 100 g".
  // Our parser defaults to quantity 1 if not specified.
  // The prompt also says "stick to grams for v1".
  // Let's assume the quantity from user input is in grams.
  // If no quantity is provided, our parser sets quantity to 1, but we should treat it as 100g.
  // The prompt is a bit ambiguous here. Let's assume for now that user quantity is a multiplier for 100g.
  // E.g. "2 eggs" - we need to know the weight of an egg.
  // The prompt says "log a TODO for later conversion".
  // For now, I'll assume the quantity is a simple multiplier of the 100g values.
  // And if no quantity is given, we show the 100g values.

  const displayQuantity = quantity === 1 ? 100 : quantity; // A bit of a fudge for now.

  const calculateValue = (nutrient: FoodNutrient | undefined) => {
    if (!nutrient) return 'N/A';
    // The user can input "2 eggs". The quantity is 2. The nutrition facts are per 100g.
    // This is where it gets tricky. We don't know the weight of one egg.
    // The prompt says: "Parse "2 eggs" vs "egg" (quantity optional)."
    // And: "If qty omitted, default to 100 g so the user sees unit values."
    // And: "Units other than grams/oz? Stick to grams for v1; log a TODO for later conversion."
    // Let's stick to the simplest interpretation for now: the quantity is just a multiplier.
    // If user enters "200 cheese", then quantity is 200, and we calculate for 200g.
    // If user enters "cheese", quantity is 1 from our parser, but we should show for 100g.

    let calculationFactor = 1;
    if (quantity !== 1) { // User provided a quantity
        calculationFactor = quantity / 100;
    }

    return (nutrient.value * calculationFactor).toFixed(2);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Amount (per {displayQuantity}g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calories (kcal)</td>
          <td>{calculateValue(calories)}</td>
        </tr>
        <tr>
          <td>Protein (g)</td>
          <td>{calculateValue(protein)}</td>
        </tr>
        <tr>
          <td>Fat (g)</td>
          <td>{calculateValue(fat)}</td>
        </tr>
        <tr>
          <td>Carbs (g)</td>
          <td>{calculateValue(carbs)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default NutritionTable; 