import * as helper from "./helpers";
import * as model from "./model";
import navbarView from "./views/navbarView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

const controlSearch = async () => {
  try {
    resultsView.renderSpinner();

    const query = navbarView.getQuery();

    if (!query) throw new Error("Empty search");

    await model.loadResaults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);

    resultsView.ClickResault();
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlPangination = (pageNum) => {
  try {
    resultsView.render(model.getSearchResultsPage(pageNum));

    paginationView.render(model.state.search);
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

    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookMarks);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const main = () => {
  navbarView.hundleSearch(controlSearch);
  paginationView.handlePagination(controlPangination);
};

main();
