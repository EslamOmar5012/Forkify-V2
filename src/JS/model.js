import * as helper from "./helpers";
import { KEY } from "./config";
import { API_URL } from "./config";
import { RES_PER_PAGE } from "./config";
import { DEFAULT_PAGE } from "./config";

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

const init = () => {
  const bookMarks = localStorage.getItem("bookmarks");
  if (bookMarks) state.bookMarks = JSON.parse(bookMarks);
};

init();

const clearBookmars = () => {
  localStorage.clear("bookmarks");
};

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
