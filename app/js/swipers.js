// Initialize Swiper1
const swiper1 = new Swiper('.product-swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.p-swiper-btn-next',
    prevEl: '.p-swiper-btn-prev',
  },
});

// Initialize Product-card-Swiper1
const swiper2 = new Swiper('.product-card-swiper1', {
  direction: 'horizontal',
  loop: true,
  effect: 'fade',

  navigation: {
    nextEl: '.pc-swiper1-btn-next',
    prevEl: '.pc-swiper1-btn-prev',
  },
});

// Initialize Product-card-Swiper2
const swiper3 = new Swiper('.product-card-swiper2', {
  direction: 'horizontal',
  loop: true,
  effect: 'fade',

  navigation: {
    nextEl: '.pc-swiper2-btn-next',
    prevEl: '.pc-swiper2-btn-prev',
  },
});

// Initialize Swiper4
const swiper4 = new Swiper('.team-swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.t-swiper-btn-next',
    prevEl: '.t-swiper-btn-prev',
  },
});
