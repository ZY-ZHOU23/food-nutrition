import React, { useState } from 'react';
import { searchFoods } from '../services/usdaApi';
import type { Food } from '../types/usda';
import { parseQuery } from '../utils/parser';
import NutritionTable from './NutritionTable';
import styles from './Search.module.css';

interface IngredientSearcherProps {
  onIngredientAdd: (food: Food, quantity: number) => void;
  // Determines if the "Add" button should be shown after selecting an item.
  showAddButton: boolean;
}

const IngredientSearcher: React.FC<IngredientSearcherProps> = ({ onIngredientAdd, showAddButton }) => {
  const [query, setQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() === '') return;

    setError(null);
    setSelectedFood(null);
    const parsed = parseQuery(query);
    setQuantity(parsed.quantity);

    try {
      const results = await searchFoods(parsed.ingredient);
      setFoods(results.slice(0, 5));
      if (results.length === 0) {
        setError('No results found for your search.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
  };
  
  const handleAddIngredient = () => {
    if (selectedFood) {
      onIngredientAdd(selectedFood, quantity);
      setSelectedFood(null);
      setFoods([]);
      setQuery('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="e.g., 'egg' or 'avocado'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {error && <p className={styles.errorText}>{error}</p>}

      {!selectedFood && foods.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul className={styles.resultsList}>
            {foods.map((food) => (
              <li key={food.fdcId} onClick={() => handleSelectFood(food)} className={styles.resultsItem}>
                {food.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedFood && (
        <div className={styles.selectedFoodContainer}>
          <h3>{selectedFood.description}</h3>
          <NutritionTable food={selectedFood} quantity={quantity} />
          {showAddButton && (
            <button onClick={handleAddIngredient} className={`${styles.button} ${styles.addButton}`}>
              Add Ingredient
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientSearcher; 