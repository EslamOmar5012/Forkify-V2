import View from "./view";

class BookMarksView extends View {
  _parentEl = document.querySelector(".recipes-stored");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";

  _generateMarkup() {
    return this._data
      .map((bookmark) => {
        return `<div class="bookmark">
                    <div class="image">
                        <img src="${bookmark.image}" alt="${bookmark.image}" title = "${bookmark.image}"/>
                    </div>
                    <div class="text">
                        <p>${bookmark.title}</p>
                        <span>${bookmark.publisher}</span>
                    </div>
                    <a href="#${bookmark.id}"></a>
                </div>`;
      })
      .join("");
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  clickResult(data) {
    if (data.length === 0) return;
    else {
      const bookmarks = document.getElementsByClassName("bookmark");
      for (const bookmark of bookmarks) {
        bookmark.addEventListener("click", (e) => {
          const link = e.target.querySelector("a");
          window.location.hash = link.href.split("/").at(-1);
        });
      }
      //   console.log(bookmarks);
    }
  }
}

export default new BookMarksView();
