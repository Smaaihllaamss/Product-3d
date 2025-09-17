const menu = document.querySelector('.mobile-menu');
const menuBtnOpen = document.querySelector('.menu-btn-open');
const menuBtnClose = document.querySelector('.menu-btn-close');

const menuLinks = document.querySelectorAll('.mobile-menu__link');

const toggleMenu = () => menu.classList.toggle('is-open');

menuBtnOpen.addEventListener('click', toggleMenu);
menuBtnClose.addEventListener('click', toggleMenu);

//Close the mobile-menu when a link is clicked
menuLinks.forEach((link) => {
  link.addEventListener('click', toggleMenu);
});
