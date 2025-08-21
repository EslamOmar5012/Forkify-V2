export default class View {
  _data;

  render(data) {
    if (!data || data.length === 0) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    // if (!data || data.length === 0) return this.renderError();
    this._data = data;

    const newMarkup = this._generateMarkup();

    //to make a DOM object that is not in page
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElement = Array.from(this._parentEl.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      //console.log(curEl, newEl.isEqualNode(curEl));

      //Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        //console.log('🔴', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });

    //console.log(curElement);
    //console.log(newElements);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
                  <div class = "spinner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
                      <path fill="#D5D5D5" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity="0.5" />
                      <path fill="#D5D5D5" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z">
                        <animateTransform attributeName="transform" dur="2s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate" />
                      </path>
                    </svg>
                    </path>
                    </svg>
                  </div>
                  `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
                  <div class="error">
                    <div>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      >
                      <path fill="#D5D5D5" d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
                      <path
                        fill="#D5D5D5"
                        d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.99 1.99 0 0 0 .054 1.968A1.98 1.98 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.99 1.99 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z"
                      />
                      </svg>
                    </div>
                    <h3>${message}</h3>
                  </div>
                        `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  // renderMessage(message = this._message) {
  //   const markup = `
  //     <div class="message">
  //       <div>
  //         <svg>
  //           <use href="${icons}#icon-smile"></use>
  //         </svg>
  //       </div>
  //       <p>${message}</p>
  //     </div>
  //   `;
  //   this._clear();
  //   this._parentEl.insertAdjacentHTML("afterbegin", markup);
  // }
}
