const navbar = document.querySelector(".navbar-custom");

function toggleNavbarLinksOnScroll() {
  if (!navbar) {
    return;
  }

  navbar.classList.toggle("is-scrolled", window.scrollY > 20);
}

toggleNavbarLinksOnScroll();
window.addEventListener("scroll", toggleNavbarLinksOnScroll);
