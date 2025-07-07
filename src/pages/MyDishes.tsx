import React, { useState, useEffect, useMemo } from 'react';
import type { SavedDish, DishIngredient } from '../types/dish';
import styles from './Page.module.css';

const NUTRITION_IDS = {
  calories: 1008,
};

type SortKey = 'timestamp_desc' | 'timestamp_asc' | 'calories_desc' | 'calories_asc' | 'ingredients_desc' | 'ingredients_asc';

interface MyDishesProps {
  onLoadDish: (dish: SavedDish) => void;
}

const MyDishes: React.FC<MyDishesProps> = ({ onLoadDish }) => {
  const [dishes, setDishes] = useState<SavedDish[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('timestamp_desc');

  useEffect(() => {
    const savedDishes = JSON.parse(localStorage.getItem('dishes') || '[]');
    setDishes(savedDishes);
  }, []);

  const handleRemoveDish = (dishTimestamp: string) => {
    const newDishes = dishes.filter((d) => d.timestamp !== dishTimestamp);
    setDishes(newDishes);
    localStorage.setItem('dishes', JSON.stringify(newDishes));
  };

  const calculateTotalCalories = (ingredients: DishIngredient[]): number => {
    return ingredients.reduce((total, item) => {
      const calorieNutrient = item.food.foodNutrients.find(
        (n) => n.nutrientId === NUTRITION_IDS.calories
      );
      if (calorieNutrient) {
        return total + (calorieNutrient.value * item.quantity) / 100;
      }
      return total;
    }, 0);
  };

  const sortedDishes = useMemo(() => {
    return [...dishes].sort((a, b) => {
      switch (sortKey) {
        case 'timestamp_asc':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'calories_desc':
          return calculateTotalCalories(b.ingredients) - calculateTotalCalories(a.ingredients);
        case 'calories_asc':
          return calculateTotalCalories(a.ingredients) - calculateTotalCalories(b.ingredients);
        case 'ingredients_desc':
          return b.ingredients.length - a.ingredients.length;
        case 'ingredients_asc':
          return a.ingredients.length - b.ingredients.length;
        case 'timestamp_desc':
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });
  }, [dishes, sortKey]);

  const handleLoadDish = (dish: SavedDish) => {
    onLoadDish(dish);
  };

  return (
    <div className={styles.pageContainer}>
      <h2>My Saved Dishes</h2>
      <div className={styles.sortingControls}>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
          <option value="timestamp_desc">Date (Newest First)</option>
          <option value="timestamp_asc">Date (Oldest First)</option>
          <option value="calories_desc">Calories (High to Low)</option>
          <option value="calories_asc">Calories (Low to High)</option>
          <option value="ingredients_desc">Ingredients (Most to Fewest)</option>
          <option value="ingredients_asc">Ingredients (Fewest to Most)</option>
        </select>
      </div>
      {sortedDishes.length === 0 ? (
        <p>You haven't saved any dishes yet.</p>
      ) : (
        <ul className={styles.list}>
          {sortedDishes.map((dish) => (
            <li key={dish.timestamp} className={styles.listItem}>
              <div
                className={styles.dishInfo}
                onClick={() => handleLoadDish(dish)}
              >
                <strong>{dish.dishName}</strong>
                <small>
                  {calculateTotalCalories(dish.ingredients).toFixed(0)} kcal
                  &nbsp;&bull;&nbsp;
                  {dish.ingredients.length} ingredients
                </small>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent loading the dish
                  handleRemoveDish(dish.timestamp);
                }}
                className={styles.removeButton}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDishes; 