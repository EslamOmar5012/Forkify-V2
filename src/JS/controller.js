import * as helper from "./helpers";
import * as model from "./model";
import navbarView from "./views/navbarView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

const controlSearch = async () => {
  try {
    resultsView.renderSpinner();

    const query = navbarView.getQuery();

    if (!query) return;

    await model.loadResaults(query);

    console.log(model.state);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlPangination = (pageNum) => {
  try {
    resultsView.render(model.getSearchResultsPage(pageNum));

    console.log(model.state.search.page);

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const main = () => {
  navbarView.hundleSearch(controlSearch);
  paginationView.handlePagination(controlPangination);
};

main();
