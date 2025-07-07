import React, { useState, useEffect } from 'react';
import type { DishIngredient, SavedDish } from '../types/dish';
import IngredientSearcher from '../components/IngredientSearcher';
import DishTotals from '../components/DishTotals';
import type { Food } from '../types/usda';
import useBeforeUnload from '../hooks/useBeforeUnload';
import styles from './Page.module.css';
import NutritionTable from '../components/NutritionTable';

const NUTRITION_IDS = {
  calories: 1008,
};

interface DishBuilderProps {
  dish: SavedDish | null;
  onIngredientsChange: (ingredients: DishIngredient[]) => void;
  onDishNameChange: (name: string) => void;
  onSave: () => void;
}

const DishBuilder: React.FC<DishBuilderProps> = ({ dish, onIngredientsChange, onDishNameChange, onSave }) => {
  const dishName = dish?.dishName || '';
  const ingredients = dish?.ingredients || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useBeforeUnload(ingredients.length > 0);

  const handleAddIngredient = (food: Food, quantity: number) => {
    const newIngredients = [...ingredients, { food, quantity }];
    onIngredientsChange(newIngredients);
  };
  
  const handleRemoveIngredient = (indexToRemove: number) => {
    const newIngredients = ingredients.filter((_, index) => index !== indexToRemove);
    onIngredientsChange(newIngredients);
  };

  const handleQuantityChange = (indexToUpdate: number, newQuantity: number) => {
    const newIngredients = ingredients.map((item, index) => {
      if (index === indexToUpdate) {
        return { ...item, quantity: newQuantity >= 0 ? newQuantity : 0 };
      }
      return item;
    });
    onIngredientsChange(newIngredients);
  };

  const getIngredientCalories = (ingredient: DishIngredient) => {
    const calorieNutrient = ingredient.food.foodNutrients.find(
      (n) => n.nutrientId === NUTRITION_IDS.calories
    );
    if (!calorieNutrient) return 0;
    return (calorieNutrient.value * ingredient.quantity) / 100;
  };

  return (
    <div className={styles.pageContainer}>
      <h2>{dish?.timestamp ? 'Edit Dish' : 'Create a New Dish'}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="dishName">Dish Name:</label>
        <input
          id="dishName"
          type="text"
          value={dishName}
          onChange={(e) => onDishNameChange(e.target.value)}
          placeholder="e.g., Veggie Omelette"
        />
        <button type="button" onClick={onSave} className={styles.primaryButton}>
          {dish?.timestamp ? 'Update Dish' : 'Save New Dish'}
        </button>
      </div>

      <div>
        <h3>Add Ingredients</h3>
        <IngredientSearcher onIngredientAdd={handleAddIngredient} showAddButton={true} />
      </div>

      <hr />

      <DishTotals ingredients={ingredients} />

      <div>
        <h3>Current Ingredients</h3>
        {ingredients.length === 0 ? (
          <p>No ingredients added yet.</p>
        ) : (
          <ul className={styles.list}>
            {ingredients.map((ingredient, index) => (
              <li key={`${ingredient.food.fdcId}-${index}`} className={`${styles.listItem} ${styles.listItemClickable}`}>
                <div className={styles.ingredientSummary} onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                  <span className={styles.ingredientName}>{ingredient.food.description}</span>
                  <span className={styles.ingredientCalories}>
                    {getIngredientCalories(ingredient).toFixed(0)} kcal
                  </span>
                </div>
                {expandedIndex === index && (
                  <div className={styles.details}>
                    <NutritionTable food={ingredient.food} quantity={ingredient.quantity} />
                  </div>
                )}
                <div className={styles.quantityEditor}>
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10) || 0)}
                    className={styles.quantityInput}
                  />
                  <span>g</span>
                  <button onClick={() => handleRemoveIngredient(index)} className={styles.removeButton}>
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DishBuilder; 