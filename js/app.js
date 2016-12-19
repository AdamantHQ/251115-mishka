var mainMenuList = document.querySelector(".main-menu__list");
var mainMenuBtn = document.querySelector(".main-menu__btn");
var overlay = document.querySelector(".overlay");
var pageCart = document.querySelector(".page-cart");
var featuredBtn = document.querySelector(".featured__btn");
var catalogItemBtns = document.querySelectorAll(".catalog-item__cart");


toggleMenu();

function toggleMenu() {
  mainMenuList.classList.toggle("main-menu__list--opened");
  mainMenuList.classList.toggle("main-menu__list--closed");
  mainMenuBtn.classList.toggle("hamburger--opened");
  // mainMenuBtn.classList.toggle("hamburger--closed");
}

mainMenuBtn.addEventListener("click", function (event) {
  event.preventDefault();
  toggleMenu();
});

if (pageCart) {
  function toggleModal() {
    overlay.classList.toggle("overlay--visible");
    overlay.classList.toggle("overlay--hidden");
    pageCart.classList.toggle("page-cart--visible");
    pageCart.classList.toggle("page-cart--hidden");
  }

  if (featuredBtn) {
    featuredBtn.addEventListener("click", function (event) {
      event.preventDefault();
      toggleModal();
    });
  }

  if (catalogItemBtns) {
    [].forEach.call(catalogItemBtns, function(button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        toggleModal();
      });

    });
  }

  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27 && overlay.classList.contains("overlay--visible")) {
      toggleModal();
    }
  });

  overlay.addEventListener("click", function () {
    toggleModal();
  });
}
