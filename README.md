# Food Nutrition Calculator

A web application to track the nutritional content of your meals. This project helps you check the calorie and macronutrient information for individual ingredients and entire dishes.

## Features

### Mode 1: Ingredient Checker
- Search for any food ingredient (e.g., "avocado" or "200g chicken breast").
- View a detailed breakdown of its nutritional values, including calories, protein, fat, and carbohydrates.
- If multiple food items match your search, you can select the correct one from a list.

### Mode 2: Dish Builder (Upcoming)
- Create and name a new dish.
- Add multiple ingredients with specific quantities.
- Get real-time nutritional totals for your entire dish.
- Save your favorite dishes to `localStorage` for quick access later.

## Tech Stack
- **Frontend:** React with Vite and TypeScript
- **Data Source:** [USDA FoodData Central API](https://fdc.nal.usda.gov/api-guide.html)
- **Styling:** Plain CSS (to be enhanced)

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm

### Installation & Setup

1.  **Navigate to the project directory:**
    Once you have the project files, navigate into the project directory:
    ```bash
    cd food-nutrition
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Get a USDA API Key:**
    - Sign up for a free API key at the [USDA FoodData Central website](https://fdc.nal.usda.gov/api-key-signup/).
    - Once you have your key, create a `.env.local` file in the root of the project.

4.  **Configure your environment variables:**
    - Open the `.env.local` file and add your API key like this:
      ```
      VITE_USDA_API_KEY=YOUR_API_KEY_HERE
      ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Project Structure
The project is organized into the following main directories:
- `src/components`: Reusable React components.
- `src/pages`: Main page components that represent different views.
- `src/services`: API-related logic for fetching data.
- `src/types`: TypeScript type definitions.
- `src/utils`: Helper functions and utilities.
- `src/hooks`: Custom React hooks.