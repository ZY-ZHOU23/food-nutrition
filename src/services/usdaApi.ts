import type { Food } from '../types/usda';

const API_KEY = import.meta.env.VITE_USDA_API_KEY || 'DEMO_KEY';
const API_URL = 'https://api.nal.usda.gov/fdc/v1';

export const searchFoods = async (query: string): Promise<Food[]> => {
  const response = await fetch(`${API_URL}/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  
  if (response.status === 429) {
    throw new Error('API rate limit exceeded. The DEMO_KEY has very low limits. Please add your own free API key to the .env.local file to fix this.');
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch data from USDA API. Status: ${response.status}`);
  }

  const data = await response.json();
  return data.foods;
}; 