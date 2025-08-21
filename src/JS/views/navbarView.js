import View from "./view";

class NavBarView extends View {
  _parentEl = document.querySelector(".navbar");
  _mq = window.matchMedia("(max-width: 1200px)");
  _data;

  constructor() {
    super();
    this._toggleTheme();
    this._updatePlaceholder();
    this._mq.addEventListener("change", this._updatePlaceholder.bind(this));
  }

  hundleSearch(handler) {
    this._parentEl.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  _toggleTheme() {
    this._parentEl
      .querySelector(".btn-toggle-theme")
      .addEventListener("click", (e) => {
        e.preventDefault();

        document.body.classList.toggle("dark-theme");

        this._parentEl
          .querySelector(".btn-toggle-theme")
          .classList.toggle("left");

        this._parentEl.querySelector(".sun").classList.toggle("rotate");
      });
  }

  _updatePlaceholder() {
    this._mq.matches
      ? (this._parentEl.querySelector(".input-search-bar").placeholder = "")
      : (this._parentEl.querySelector(".input-search-bar").placeholder =
          "Search Over 1,000,0000 Recipes");
  }

  getQuery() {
    const query = this._parentEl.querySelector(".input-search-bar");
    return query.value;
  }
}

export default new NavBarView();
