import View from "./view";
import Fraction from "fraction.js";

class RecipeView extends View {
  _parentEl = document.querySelector(".recipes");
  _errorMessage = "We could not find that recipe. Please try another one!";

  _generateMarkup() {
    return `<div class="recipe">
                <div class="about">
                <h2>${this._data.title}</h2>
                <img src="${this._data.image}" alt="${
      this._data.image
    }" title = "${this._data.image}"/>
                </div>

                <div class="info-for-recipe">
                <div class="timing-surving">
                    <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 512 512"
                    >
                        <path
                        fill="#D5D5D5"
                        d="M464 256a208 208 0 1 1-416 0a208 208 0 1 1 416 0M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0m232-136v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24"
                        />
                    </svg>
                    <span class="num">${this._data.cookingTime}</span>
                    <span class="span-text">minutes</span>
                    </p>
                    <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 512 512"
                    >
                        <path
                        fill="#D5D5D5"
                        d="M336 256c-20.56 0-40.44-9.18-56-25.84c-15.13-16.25-24.37-37.92-26-61c-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52c15.47 16.62 23 39.22 21.26 63.63c-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256m131.83 176H204.18a27.71 27.71 0 0 1-22-10.67a30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05c31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432M147 260c-35.19 0-66.13-32.72-69-72.93c-1.42-20.6 5-39.65 18-53.62c12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52c-2.87 40.2-33.8 72.91-68.93 72.91m65.66 31.45c-17.59-8.6-40.42-12.9-65.65-12.9c-29.46 0-58.07 7.68-80.57 21.62c-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88c8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89"
                        />
                    </svg>
                    <span class="num">${this._data.servings}</span>
                    <span class="span-text">survings</span>
                    </p>
                    <div class="plus-minus">
                    <svg
                        class = "minus"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                    >
                        <path
                        fill="#D5D5D5"
                        d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z"
                        />
                    </svg>
                    <svg
                        class = "plus"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                    >
                        <path
                        fill="#D5D5D5"
                        d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z"
                        />
                    </svg>
                    </div>
                </div>
                <button class="btn btn-bookmark">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    >
                    <path
                        fill="${
                          this._data.bookMarked === true ? "#fff" : "none"
                        }"
                        stroke="#FFF"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 7.2v9.485c0 1.361 0 2.042.204 2.458a2 2 0 0 0 2.06 1.102c.46-.06 1.026-.438 2.158-1.193l.003-.002c.449-.3.673-.449.908-.532a2 2 0 0 1 1.333 0c.235.083.46.233.911.534c1.133.755 1.7 1.132 2.16 1.193a2 2 0 0 0 2.059-1.102c.204-.416.204-1.097.204-2.458V7.197c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.875-.874C16.48 4 15.92 4 14.8 4H9.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C6 5.52 6 6.08 6 7.2"
                    />
                    </svg>
                </button>
                </div>

                <div class="nutrition-facts">
                <h2>Nutrition Facts / 100G</h2>
                <div class="calories">
                    <div class="box">
                    <h3>Calories</h3>
                    <p>${Math.round(this._data.calories)} Kcal</p>
                    </div>
                    <div class="box">
                    <h3>Fats</h3>
                    <p>${Math.round(this._data.fats)} g</p>
                    </div>
                    <div class="box">
                    <h3>Carbs</h3>
                    <p>${Math.round(+this._data.carbs)} g</p>
                    </div>
                    <div class="box">
                    <h3>Protein</h3>
                    <p>${Math.round(+this._data.protien)} g</p>
                    </div>
                </div>
                </div>

                <div class="ingredients">
                <h2>Recipe Ingredients</h2>
                <ul class="ing-list">
                    ${this._data.ingredients
                      .map((el) => this._generateMarkupIngredient(el))
                      .join("")}
                </ul>
                </div>

                <div class="cook">
                <h2>How To Cook It</h2>
                <p>
                    This Recipe was Carefully Designed and Tested by
                    <span>${
                      this._data.publisher
                    }</span> Please Check Out Directions at their
                    Website.
                </p>
                <button class="btn btn-cook-direction">
                    <a href = "${this._data.sourceUrl}" target = "_blank"></a>
                    Directions
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    >
                    <path
                        fill="#D5D5D5"
                        fill-rule="evenodd"
                        d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                        clip-rule="evenodd"
                    />
                    </svg>
                </button>
                </div>
          </div>`;
  }

  _generateMarkupIngredient(ing) {
    // console.log(ing.quantity);
    const frac = new Fraction(ing.quantity);
    return `
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#D5D5D5"
                      fill-rule="evenodd"
                      stroke="#D5D5D5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="number">${
                    ing.quantity ? frac.toFraction(true) : ""
                  }</span>
                  <span class = "unit">${ing.unit}</span>
                  <span class="ing">${ing.description}</span>
                </li>
  `;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((el) =>
      window.addEventListener(el, handler)
    );
  }

  addHandlerServings(handler) {
    const serving_btns = document.querySelector(".plus-minus");
    serving_btns.addEventListener("click", (e) => {
      const btn = e.target.closest("svg");
      //   console.log(btn.classList);
      if (!btn) return;

      if (btn.classList.value === "plus" && this._data.servings < 10)
        handler(this._data.servings + 1);

      if (btn.classList.value === "minus" && this._data.servings > 1)
        handler(this._data.servings - 1);
    });
  }

  handleDirection() {
    const btn = document.querySelector(".btn-cook-direction");
    btn.addEventListener("click", (e) => {
      btn.querySelector("a").click();
    });
  }
}

export default new RecipeView();
