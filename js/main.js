$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
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
});
