const toggles = document.querySelectorAll(".toggle");

document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  toggles.forEach((toggle) => toggle.classList.toggle("dark-theme"));
});
