// Troca a imagem de destaque do hero ao clicar nos botoes numerados.
const hero = document.querySelector(".hero");
const heroMarkers = document.querySelectorAll(".hero__marker");

if (hero) {
  heroMarkers.forEach(function (marker) {
    marker.addEventListener("click", function () {
      const imageNumber = marker.dataset.heroImage;

      hero.classList.remove("hero--image-1", "hero--image-2", "hero--image-3", "hero--image-4");
      hero.classList.add(`hero--image-${imageNumber}`);

      heroMarkers.forEach(function (item) {
        item.classList.remove("hero__marker--active");
        item.setAttribute("aria-pressed", "false");
      });

      marker.classList.add("hero__marker--active");
      marker.setAttribute("aria-pressed", "true");
    });
  });
}
