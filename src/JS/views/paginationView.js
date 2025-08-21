import View from "./view";
import { RES_PER_PAGE } from "../config";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination-btns");
  _page = document.querySelector(".page");
  _total_pages = document.querySelector(".total_pages");
  _pagesnum;

  _generateMarkup() {
    const numOfPages = Math.trunc(this._data.results.length / RES_PER_PAGE);

    this._total_pages.textContent = numOfPages;
    this._page.textContent = this._data.page;

    const next_btn = `<button class="btn btn-prev" data-page = "${
      this._data.page + 1
    }">
                        Page ${this._data.page + 1}
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
                        </button>`;

    const prev_btn = `<button class="btn btn-next" data-page = "${
      this._data.page - 1
    }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                            fill="#D5D5D5"
                            d="M19 13H6.75L12 18.25l-.66.75l-6.5-6.5l6.5-6.5l.66.75L6.75 12H19z"
                            />
                        </svg>
                        Page ${this._data.page - 1}
                        </button>`;

    if (this._data.page === 1 && numOfPages > 1) {
      return next_btn;
    }

    if (numOfPages <= 1) {
      return "";
    }

    if (this._data.page === numOfPages && numOfPages > 1) {
      return prev_btn;
    }

    if (this._data.page < numOfPages) {
      return `${prev_btn}${next_btn}`;
    }
  }

  handlePagination(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler(Number(btn.dataset.page));
    });
  }
}

export default new PaginationView();
