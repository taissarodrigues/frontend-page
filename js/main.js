const navbar = document.querySelector(".site-header__nav");

function toggleNavbarLinksOnScroll() {
  if (!navbar) {
    return;
  }

  navbar.classList.toggle("is-scrolled", window.scrollY > 20);
}

toggleNavbarLinksOnScroll();
window.addEventListener("scroll", toggleNavbarLinksOnScroll);
