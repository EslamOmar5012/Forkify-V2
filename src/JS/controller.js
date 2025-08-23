import * as helper from "./helpers";
import * as model from "./model";
import navbarView from "./views/navbarView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import recipeView from "./views/recipeView";
import bookMarksView from "./views/bookMarksView";

const controlSearch = async () => {
  try {
    resultsView.renderSpinner();

    const query = navbarView.getQuery();

    if (!query) throw new Error("Empty search");

    await model.loadResaults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);

    resultsView.clickResult();
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlPangination = (pageNum) => {
  try {
    resultsView.render(model.getSearchResultsPage(pageNum));

    paginationView.render(model.state.search);

    resultsView.clickResult();
  } catch (err) {
    console.log(err);
  }
};

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    await model.getNutrition(model.state.recipe.title);

    recipeView.render(model.state.recipe);

    recipeView.addHandlerServings(controlServings);

    recipeView.handleDirection();

    recipeView.addHandlerBookmark(controlBookmark);

    bookMarksView.clickResult(model.state.bookMarks);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlServings = (newServings) => {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = () => {
  if (!model.state.recipe.bookMarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookMarksView.render(model.state.bookMarks);

  bookMarksView.clickResult(model.state.bookMarks);
};

const controlLoadBookmarks = () => {
  bookMarksView.render(model.state.bookMarks);

  bookMarksView.clickResult(model.state.bookMarks);
};

const main = () => {
  navbarView.hundleSearch(controlSearch);
  paginationView.handlePagination(controlPangination);
  recipeView.addHandlerRender(controlRecipes);
  bookMarksView.addHandlerRender(controlLoadBookmarks);
};

main();
