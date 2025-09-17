function setBackgroundImages() {
  let imgDivs = document.querySelectorAll('.price-card__img');

  for (let i = 0; i < imgDivs.length; i++) {
    const imgDiv = imgDivs[i];
    let imgSrc;

    if (window.devicePixelRatio > 1) {
      imgSrc = imgDiv.getAttribute('data-src-2x');
    } else {
      imgSrc = imgDiv.getAttribute('data-src');
    }

    imgDiv.style.backgroundImage = `url(${imgSrc})`;
  }
}

setBackgroundImages();
