// Inicializa os carrosseis apenas se o jQuery e o Owl Carousel estiverem carregados.
if (window.jQuery) {
  $(document).ready(function () {
    if ($.fn.owlCarousel) {
      $(".carousel__track").owlCarousel({
        items: 6,
        loop: true,
        margin: 24,
        nav: false,
        dots: false,
        responsive: {
          0: {
            items: 1,
            margin: 16,
            stagePadding: 48,
          },
          600: {
            items: 3,
          },
          992: {
            items: 4,
          },
          1200: {
            items: 6,
          },
        },
      });

      $(".galeria__track").owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        navText: [
          '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span class="visually-hidden">Imagem anterior</span>',
          '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i><span class="visually-hidden">Proxima imagem</span>',
        ],
      });
    }
  });
}
