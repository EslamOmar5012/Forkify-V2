document.querySelector(".btn-toggle-theme").addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("dark-theme");
  document.querySelector(".btn-toggle-theme").classList.toggle("left");
  document.querySelector(".sun").classList.toggle("rotate");
});

const searchBar = document.querySelector(".input-search-bar");

const mq = window.matchMedia("(max-width: 1200px)");

const updatePlaceholder = () => {
  mq.matches
    ? (searchBar.placeholder = "")
    : (searchBar.placeholder = "Search Over 1,000,0000 Recipes");
};

// Run on page load
updatePlaceholder();

// Run whenever the screen size matches/unmatches
mq.addEventListener("change", updatePlaceholder);
