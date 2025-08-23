import * as helper from "./helpers";
import { KEY, MODAL_CLOSE_SEC } from "./config";
import { API_URL } from "./config";
import { RES_PER_PAGE } from "./config";
import { DEFAULT_PAGE } from "./config";
import { NUTRITION_API } from "./config";
import { NUTRITION_KEY } from "./config";
import { MODAL_CLOSE_SEC } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookMarks: [],
};

const createRecipeObject = (data) => {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    bookMarked: false,
  };
};

const checkBookmarkRecipes = (id) => {
  const recipe = state.bookMarks.find((el) => el.id === id);
  return recipe;
};

export const loadRecipe = async (id) => {
  try {
    const bookmarkRecipe = checkBookmarkRecipes(id);

    if (bookmarkRecipe !== undefined) {
      state.recipe = bookmarkRecipe;
    } else {
      const data = await helper.AJAX(`${API_URL}/${id}?key=${KEY}`);
      state.recipe = createRecipeObject(data);
    }
    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadResaults = async (query) => {
  try {
    state.search.query = query;
    const data = await helper.AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = DEFAULT_PAGE) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  // console.log(state.search.results.slice(start, end));

  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const presistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookMarks));
};

export const addBookmarks = (recipe) => {
  state.bookMarks.push(recipe);
  state.recipe.bookMarked = true;

  presistBookmarks();
};

export const deleteBookmark = (id) => {
  const newBookMarksArray = state.bookMarks.filter((el) => el.id !== id);

  state.bookMarks = [...newBookMarksArray];

  state.recipe.bookMarked = false;

  presistBookmarks();
};

// const clearBookmars = () => {
//   localStorage.clear("bookmarks");
// };

export const uploadRecipe = async (newRecipe) => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use correct format :)"
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await helper.AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmarks(state.recipe);
    state.recipe.key = KEY;
  } catch (err) {
    throw err;
  }
};

export const getNutrition = async (recipe) => {
  try {
    // Clean up recipe name for better API search
    const cleanRecipeName = recipe
      .toLowerCase()
      .replace(/homemade|recipe/gi, "")
      .replace(/pizza/gi, "pizza")
      .trim();

    const url = `${NUTRITION_API}${encodeURIComponent(
      cleanRecipeName
    )}&pageSize=5&api_key=${NUTRITION_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Nutrition API error: ${res.status}`);

    const data = await res.json();

    // Check if we got any results
    if (!data.foods || data.foods.length === 0) {
      // Set default values if no nutrition data found
      state.recipe.calories = 250;
      state.recipe.fats = 12;
      state.recipe.carbs = 30;
      state.recipe.protien = 10;
      console.log("No nutrition data found, using default values");
      return;
    }

    const nutritions = data.foods[0].foodNutrients;

    // Helper function to find nutrient value safely
    const findNutrient = (nutrientName) => {
      const nutrient = nutritions.find(
        (el) => el.nutrientName === nutrientName
      );
      return nutrient ? Math.round(nutrient.value) : 0;
    };

    // Map nutrition data with fallbacks
    state.recipe.calories =
      findNutrient("Energy") ||
      findNutrient("Energy (Atwater General Factors)") ||
      250;
    state.recipe.fats =
      findNutrient("Total lipid (fat)") || findNutrient("Total Fat") || 12;
    state.recipe.carbs =
      findNutrient("Carbohydrate, by difference") ||
      findNutrient("Total Carbohydrate") ||
      30;
    state.recipe.protien = findNutrient("Protein") || 10;

    console.log("Nutrition data loaded:", {
      calories: state.recipe.calories,
      fats: state.recipe.fats,
      carbs: state.recipe.carbs,
      protein: state.recipe.protien,
    });
  } catch (err) {
    console.error("Nutrition API Error:", err);
    // Set reasonable default values for pizza
    state.recipe.calories = 250;
    state.recipe.fats = 12;
    state.recipe.carbs = 30;
    state.recipe.protien = 10;
  }
};

const init = () => {
  const bookMarks = localStorage.getItem("bookmarks");
  if (bookMarks) state.bookMarks = JSON.parse(bookMarks);
};

init();
