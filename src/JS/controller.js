document.querySelector(".btn-toggle-theme").addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("dark-theme");
  document.querySelector(".btn-toggle-theme").classList.toggle("left");
  document.querySelector(".sun").classList.toggle("rotate");
});
