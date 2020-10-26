'use strict';
// Start Pin
(function () {
  const startPin = document.querySelector('.map__pin--main');
  window.startPinLocation = {
    x: parseInt(startPin.style.left) - startPin.offsetWidth / 2,
    y: parseInt(startPin.style.top) - startPin.offsetHeight
  };
  startPin.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      window.util.addActiveClass();
    }
  });
  startPin.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      window.util.addActiveClass();
    }
  });
})();

// Pins
(function () {
  const pinTemplate = document.querySelector('#pin').content;
  window.createPin = function (positionX, positionY, src, title, fragment) {
    let newPin = pinTemplate.querySelector('.map__pin').cloneNode(true);
    let pinImg = newPin.querySelector('img');
    pinImg.src = src;
    pinImg.alt = title;
    newPin.setAttribute('style', 'left: ' + (positionX + 10) + 'px; top: ' + positionY + 'px;');
    fragment.appendChild(newPin);
    return fragment;
  };
})();
