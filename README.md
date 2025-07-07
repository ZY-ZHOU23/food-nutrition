# Food Nutrition Calculator

A modern web application to track the nutritional content of your meals. This project helps you check the calorie and macronutrient information for individual ingredients and build complete dishes with nutritional tracking.

## Features

### Mode 1: Ingredient Search
- Search for any food ingredient with smart parsing (e.g., "2 eggs", "200g chicken breast", or just "avocado")
- View detailed nutritional breakdowns including calories, protein, fat, and carbohydrates
- Handle multiple search results with an easy selection interface
- Real-time nutritional calculations based on quantity

### Mode 2: Dish Builder
- Create and name custom dishes
- Add multiple ingredients with specific quantities
- Live-updating nutritional totals for your entire dish
- Save dishes to browser storage for future reference
- Edit existing dishes or create new ones
- Visual calorie tracking for each ingredient

### Mode 3: My Saved Dishes
- View all your saved dishes in an organized list
- Sort dishes by date, calories, or ingredient count
- Load saved dishes back into the Dish Builder for editing
- Delete dishes you no longer need
- See total calories and ingredient count at a glance

## Tech Stack
- **Frontend:** React 18 with Vite and TypeScript
- **Data Source:** [USDA FoodData Central API](https://fdc.nal.usda.gov/api-guide.html)
- **Styling:** Modern CSS with CSS Modules and design system
- **Storage:** Browser localStorage for dish persistence

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd food-nutrition
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## API Key Information

**Current Setup:** The app uses the USDA's `DEMO_KEY` by default, which provides limited free access to the USDA FoodData Central API. This allows you to test the application immediately without any setup.

**For Production Use:** The `DEMO_KEY` has very low rate limits (1000 requests/hour). For extended use, you should:

1. **Get your own free API key** at the [USDA FoodData Central website](https://fdc.nal.usda.gov/api-key-signup/)
2. **Create a `.env.local` file** in the root directory
3. **Add your API key:**
   ```
   VITE_USDA_API_KEY=YOUR_API_KEY_HERE
   ```
4. **Restart the development server**

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── DishTotals.tsx          # Nutritional totals display
│   ├── IngredientSearcher.tsx  # Reusable ingredient search
│   └── NutritionTable.tsx      # Nutrition facts table
├── pages/              # Main page components
│   ├── DishBuilder.tsx         # Dish creation and editing
│   ├── IngredientSearch.tsx    # Individual ingredient lookup
│   ├── MyDishes.tsx           # Saved dishes management
│   └── Page.module.css        # Shared page styling
├── services/           # API integration
│   └── usdaApi.ts             # USDA API service
├── types/              # TypeScript definitions
│   ├── dish.ts               # Dish and ingredient types
│   └── usda.ts               # USDA API response types
├── utils/              # Helper functions
│   └── parser.ts             # Input parsing utilities
├── hooks/              # Custom React hooks
│   └── useBeforeUnload.ts    # Unsaved changes warning
└── App.tsx             # Main application component
```

## Usage

### Searching for Ingredients
1. Navigate to "Ingredient Search"
2. Enter ingredients with optional quantities (e.g., "2 eggs", "100g rice")
3. Select from search results if multiple options appear
4. View detailed nutritional information

### Building Dishes
1. Go to "Dish Builder"
2. Enter a name for your dish
3. Search and add ingredients one by one
4. Adjust quantities using the number inputs
5. Watch the live nutritional totals update
6. Save your dish for future reference

### Managing Saved Dishes
1. Visit "My Dishes" to see all saved dishes
2. Sort by date, calories, or ingredient count
3. Click on a dish to load it for editing
4. Use the × button to delete unwanted dishes

## Features Highlights

- **Smart Input Parsing:** Automatically separates quantities from ingredient names
- **Live Calculations:** Real-time nutritional updates as you build dishes
- **Responsive Design:** Modern, mobile-friendly interface
- **Data Persistence:** Dishes are saved to browser storage
- **Error Handling:** Graceful handling of API limits and network issues
- **Accessibility:** Proper focus management and keyboard navigation

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
This project uses TypeScript for type safety and CSS Modules for styling. Follow the existing patterns for components and maintain the established coding standards.