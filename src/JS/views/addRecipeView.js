// src/JS/views/addRecipeView.js - Complete Fixed Version
import View from "./view";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".overlay");
  _errorMessage =
    "Wrong ingredient format! Please use correct format: quantity,unit,description (e.g., 0.5,cup,rice)";

  constructor() {
    super();
    this._createOverlayIfNeeded();
    this._renderInitialModal();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _createOverlayIfNeeded() {
    if (!this._parentEl) {
      // Create overlay if it doesn't exist
      const overlay = document.createElement("div");
      overlay.className = "overlay hidden";
      document.body.appendChild(overlay);
      this._parentEl = overlay;
    }
  }

  _renderInitialModal() {
    // Render the modal HTML initially but keep it hidden
    const markup = this._generateMarkup();
    this._parentEl.innerHTML = markup;
  }

  toggleWindow() {
    this._parentEl.classList.toggle("hidden");
    // Reset form when opening
    if (!this._parentEl.classList.contains("hidden")) {
      this._resetForm();
    }
  }

  _resetForm() {
    const form = this._parentEl.querySelector(".upload");
    if (form) form.reset();
  }

  _addHandlerShowWindow() {
    const addBtn = document.querySelector(".add");
    if (addBtn) {
      addBtn.addEventListener("click", this.toggleWindow.bind(this));
    }
  }

  _addHandlerHideWindow() {
    this._parentEl.addEventListener("click", (e) => {
      if (
        e.target === this._parentEl ||
        e.target.closest(".btn--close-modal")
      ) {
        this.toggleWindow();
      }
    });

    // Also close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this._parentEl.classList.contains("hidden")) {
        this.toggleWindow();
      }
    });
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!e.target.classList.contains("upload")) return;

      const dataArray = [...new FormData(e.target)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  renderSpinner() {
    const markup = `
      <div class="add-recipe-window">
        <button class="btn--close-modal">&times;</button>
        <div class="spinner-container">
          <div class="spinner">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
              <path fill="var(--c-2)" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" />
              <path fill="var(--c-2)" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                <animateTransform attributeName="transform" dur="2s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
              </path>
            </svg>
          </div>
          <p>Uploading your recipe...</p>
        </div>
      </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  render(data = {}) {
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
      <div class="add-recipe-window">
        <button class="btn--close-modal">&times;</button>
        <form class="upload">
          <div class="upload__column">
            <h3 class="upload__heading">Recipe Data</h3>
            
            <label>Title*</label>
            <input required name="title" type="text" placeholder="Enter recipe title" />
            
            <label>Source URL*</label>
            <input required name="sourceUrl" type="url" placeholder="https://example.com/recipe" />
            
            <label>Image URL*</label>
            <input required name="image" type="url" placeholder="https://example.com/image.jpg" />
            
            <label>Publisher*</label>
            <input required name="publisher" type="text" placeholder="Publisher name" />
            
            <label>Cooking Time*</label>
            <input required name="cookingTime" type="number" min="1" max="300" placeholder="Minutes" />
            
            <label>Servings*</label>
            <input required name="servings" type="number" min="1" max="20" placeholder="Number of servings" />
          </div>

          <div class="upload__column">
            <h3 class="upload__heading">Ingredients</h3>
            <p class="ingredients-help">Format: <strong>Quantity,Unit,Description</strong><br>
            Examples: "2,cups,flour" or "1,,egg" (no unit) or ",,salt to taste"</p>
            
            <label>Ingredient 1*</label>
            <input
              required
              type="text"
              name="ingredient-1"
              placeholder="e.g., 2,cups,all-purpose flour"
            />
            
            <label>Ingredient 2</label>
            <input
              type="text"
              name="ingredient-2"
              placeholder="e.g., 1,,large egg"
            />
            
            <label>Ingredient 3</label>
            <input
              type="text"
              name="ingredient-3"
              placeholder="e.g., 0.5,tsp,salt"
            />
            
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Optional ingredient"
            />
            
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Optional ingredient"
            />
            
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Optional ingredient"
            />
          </div>

          <button type="submit" class="btn upload__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5z"
              />
            </svg>
            <span>Upload Recipe</span>
          </button>
        </form>
      </div>`;
  }

  renderMessage(message = "Recipe was successfully uploaded! 🎉") {
    const markup = `
      <div class="add-recipe-window">
        <button class="btn--close-modal">&times;</button>
        <div class="success-message">
          <div class="success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
            >
              <path
                fill="var(--c-2)"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
              />
            </svg>
          </div>
          <h3>Success!</h3>
          <p>${message}</p>
          <p class="success-note">The modal will close automatically...</p>
        </div>
      </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="add-recipe-window">
        <button class="btn--close-modal">&times;</button>
        <div class="error-message">
          <div class="error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
            >
              <path 
                fill="var(--c-2)" 
                d="M11.001 10h2v5h-2zM11 16h2v2h-2z" 
              />
              <path
                fill="var(--c-2)"
                d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.99 1.99 0 0 0 .054 1.968A1.98 1.98 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.99 1.99 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z"
              />
            </svg>
          </div>
          <h3>Upload Failed</h3>
          <p>${message}</p>
          <button class="btn retry-btn" onclick="location.reload()">Try Again</button>
        </div>
      </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new AddRecipeView();
