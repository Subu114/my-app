interface Item {
    id : number,
    name : string,
    img : string,
    description : string,
    originalPrice : number,
    discountedPrice : number,
    rating : number,
    ratingCount : number,
    tags : string[]
}

interface MealChart {
    id : number,
    title : string,
    imgUrl : string
}

interface Meal {
    meal_id: number;
    meal_name: string;
    meal_description: string;
    meal_image: string;
    meal_price: number;
    meal_category: 'veg' | 'non-veg' | 'vegan'; // This restricts the category to one of these three options
    meal_rating: number;
    meal_count: number;
    meal_ingredients: string[];
    meal_tags: string[];
    meal_calories?: number; // Optional attribute denoted by '?'
    meal_goals?: string[]; // Optional attribute denoted by '?'
  }