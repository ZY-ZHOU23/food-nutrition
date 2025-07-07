export interface FoodNutrient {
  nutrientId: number;
  nutrientName: string;
  nutrientNumber: string;
  unitName: string;
  value: number;
}

export interface Food {
  fdcId: number;
  description: string;
  dataType: string;
  gtinUpc?: string;
  brandOwner?: string;
  foodNutrients: FoodNutrient[];
} 