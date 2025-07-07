import { useState } from 'react';
import IngredientSearch from './pages/IngredientSearch';
import DishBuilder from './pages/DishBuilder';
import MyDishes from './pages/MyDishes';
import './index.css';
import styles from './App.module.css';
import type { SavedDish, DishIngredient } from './types/dish';

type Mode = 'ingredient' | 'dish' | 'my-dishes';

function App() {
  const [mode, setMode] = useState<Mode>('ingredient');
  const [currentDish, setCurrentDish] = useState<SavedDish | null>(null);

  const handleLoadDish = (dish: SavedDish) => {
    setCurrentDish(dish);
    setMode('dish');
  };

  const handleSetIngredients = (ingredients: DishIngredient[]) => {
    setCurrentDish((prev) => ({
      dishName: prev?.dishName || '',
      ingredients: ingredients,
      timestamp: prev?.timestamp || new Date().toISOString(),
    }));
  };

  const handleSetDishName = (name: string) => {
    setCurrentDish((prev) => ({
      dishName: name,
      ingredients: prev?.ingredients || [],
      timestamp: prev?.timestamp || new Date().toISOString(),
    }));
  };

  const handleSaveDish = () => {
    if (!currentDish || !currentDish.dishName.trim()) {
      alert('Please enter a dish name.');
      return;
    }
    
    const savedDishes: SavedDish[] = JSON.parse(localStorage.getItem('dishes') || '[]');
    const existingDishIndex = savedDishes.findIndex(d => d.timestamp === currentDish.timestamp);

    if (existingDishIndex > -1) {
      // Update existing dish
      savedDishes[existingDishIndex] = currentDish;
      alert('Dish updated!');
    } else {
      // Save as new dish
      savedDishes.push(currentDish);
      alert('Dish saved!');
    }
    
    localStorage.setItem('dishes', JSON.stringify(savedDishes));
    setCurrentDish(null); // Clear the builder
  };
  
  const handleNewDish = () => {
    setCurrentDish(null);
    setMode('dish');
  };

  const getNavButtonClass = (buttonMode: Mode) => {
    return `${styles.navButton} ${mode === buttonMode ? styles.navButtonActive : ''}`;
  };

  const renderMode = () => {
    switch (mode) {
      case 'ingredient':
        return <IngredientSearch />;
      case 'dish':
        return (
          <DishBuilder
            dish={currentDish}
            onIngredientsChange={handleSetIngredients}
            onDishNameChange={handleSetDishName}
            onSave={handleSaveDish}
          />
        );
      case 'my-dishes':
        return <MyDishes onLoadDish={handleLoadDish} />;
      default:
        return <IngredientSearch />;
    }
  };

  return (
    <main>
      <div className={styles.appContainer}>
        <nav className={styles.nav}>
          <button className={getNavButtonClass('ingredient')} onClick={() => setMode('ingredient')}>Ingredient Search</button>
          <button className={getNavButtonClass('dish')} onClick={handleNewDish}>Dish Builder</button>
          <button className={getNavButtonClass('my-dishes')} onClick={() => setMode('my-dishes')}>My Dishes</button>
        </nav>
        {renderMode()}
      </div>
    </main>
  );
}

export default App;
