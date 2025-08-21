import View from "./view";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "We can't find recipes!";
  _data;

  _generateMarkup() {
    return this._data
      .map((recipe) => {
        return `<div class="result">
                  <div class="image">
                    <img src="${recipe.image}" alt="img" title = "${recipe.image}"/>
                  </div>
                  <div class="text">
                    <p>${recipe.title}</p>
                    <span>${recipe.publisher}</span>
                  </div>
                  <a href="${recipe.id}"></a>
                </div>`;
      })
      .join("");
  }
}

export default new ResultsView();
