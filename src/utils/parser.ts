export interface ParsedQuery {
  quantity: number;
  ingredient: string;
}

export const parseQuery = (query: string): ParsedQuery => {
  const words = query.trim().split(' ');
  const firstWord = words[0];
  const quantity = parseFloat(firstWord);

  if (!isNaN(quantity) && words.length > 1) {
    return {
      quantity,
      ingredient: words.slice(1).join(' '),
    };
  }

  // If no quantity is found, default to 100g as per requirements,
  // but for now, we'll use a quantity of 1 and the whole query as the ingredient.
  // The 100g default will be handled when displaying nutrition.
  return {
    quantity: 1,
    ingredient: query,
  };
}; 