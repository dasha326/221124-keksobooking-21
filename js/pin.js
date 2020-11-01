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
    window.util.isEnterEvent(e, window.util.addActiveClass);
  });
})();

// Pins
(function () {
  const pinTemplate = document.querySelector('#pin').content;
  window.createPin = function (positionX, positionY, src, title, number, fragment) {
    let newPin = pinTemplate.querySelector('.map__pin').cloneNode(true);
    newPin.dataset.user = 'user-' + number;
    newPin.setAttribute('tabindex', '0');
    newPin.setAttribute('style', 'left: ' + (positionX + 10) + 'px; top: ' + positionY + 'px;');
    let pinImg = newPin.querySelector('img');
    pinImg.src = src;
    pinImg.alt = title;

    newPin.addEventListener('click', function () {
      let userId = newPin.dataset.user;
      window.openCard(userId);
    });
    newPin.addEventListener('keydown', function (e) {
      let userId = newPin.dataset.user;
      window.util.isEnterEvent(e, window.openCard, userId);
    });

    fragment.appendChild(newPin);
    return fragment;
  };
})();
