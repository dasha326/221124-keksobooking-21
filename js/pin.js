'use strict';
// Start Pin
(function () {
  const startPin = document.querySelector(`.map__pin--main`);
  window.startPinLocation = {
    x: parseInt(startPin.style.left, 10) + startPin.offsetWidth / 2,
    y: parseInt(startPin.style.top, 10) + startPin.offsetHeight / 2
  };

  startPin.addEventListener(`keydown`, function (e) {
    window.util.isEnterEvent(e, window.util.addActive);
  });

  startPin.addEventListener(`click`, function () {
    if (window.map.matches(`.map--faded`)) {
      window.util.addActive();
    }
  });

  startPin.addEventListener(`mousedown`, function (e) {
    e.preventDefault();
    let startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    const moveOn = function (evtMove) {
      evtMove.preventDefault();
      const shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };
      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      startPin.style.top = (startPin.offsetTop - shift.y) + `px`;
      startPin.style.left = (startPin.offsetLeft - shift.x) + `px`;
      window.startPinLocation = {
        x: parseInt(startPin.style.left, 10) + startPin.offsetWidth / 2,
        y: parseInt(startPin.style.top, 10) + startPin.offsetHeight
      };

      if (window.startPinLocation.x < 0) {
        startPin.style.left = 0 - startPin.offsetWidth / 2 + `px`;
      }
      if (window.startPinLocation.x > window.map.offsetWidth) {
        startPin.style.left = window.map.offsetWidth - startPin.offsetWidth / 2 + `px`;
      }
      if (window.startPinLocation.y < 130) {
        startPin.style.top = 130 - startPin.offsetHeight + `px`;
      }
      if (window.startPinLocation.y > 630) {
        startPin.style.top = 630 - startPin.offsetHeight + `px`;
      }
      window.addressField.value = Math.floor(window.startPinLocation.x) + `, ` + Math.floor(window.startPinLocation.y);
    };
    const moveUp = function () {
      document.removeEventListener(`mousemove`, moveOn);
    };

    document.removeEventListener(`click`, moveOn);
    document.addEventListener(`mousemove`, moveOn);
    document.addEventListener(`mouseup`, moveUp);
  });
})();

// Pins
(function () {
  const pinTemplate = document.querySelector(`#pin`).content;
  window.createPin = function (positionX, positionY, src, title, number, fragment) {
    const newPin = pinTemplate.querySelector(`.map__pin`).cloneNode(true);
    newPin.dataset.user = `user-` + number;
    newPin.setAttribute(`tabindex`, `0`);
    newPin.setAttribute(`style`, `left: ` + (positionX + 10) + `px; top: ` + positionY + `px;`);
    const pinImg = newPin.querySelector(`img`);
    pinImg.src = src;
    pinImg.alt = title;

    newPin.addEventListener(`click`, function () {
      const userId = newPin.dataset.user;
      window.openCard(userId);
    });
    newPin.addEventListener(`keydown`, function (e) {
      const userId = newPin.dataset.user;
      window.util.isEnterEvent(e, window.openCard, userId);
    });

    fragment.appendChild(newPin);
    return fragment;
  };
})();
