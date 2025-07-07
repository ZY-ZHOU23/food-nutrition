import React from 'react';
import IngredientSearcher from '../components/IngredientSearcher';

const IngredientSearch: React.FC = () => {
  // A no-op function for Mode 1 as we're only displaying information.
  const handleSelect = () => {};

  return (
    <div>
      <h2>Ingredient Search</h2>
      <IngredientSearcher onIngredientAdd={handleSelect} showAddButton={false} />
    </div>
  );
};

export default IngredientSearch; 