'use strict';

(function () {
  const startPin = document.querySelector('.map__pin--main');
  window.pinCount = 7;
  window.infoObjects = [];
  window.startPinLocation = {
    x: parseInt(startPin.style.left) - startPin.offsetWidth / 2,
    y: parseInt(startPin.style.top) - startPin.offsetHeight
  };
  let createPin = function (positionX, positionY, src, title) {
    let newPin = window.util.makeElement('button', 'map__pin');
    let pinImg = window.util.makeElement('img', undefined, undefined, src);
    pinImg.alt = title;
    newPin.setAttribute('style', 'left: ' + (positionX + 10) + 'px; top: ' + positionY + 'px;');
    newPin.appendChild(pinImg);
    window.mapPinsContainer.appendChild(newPin);
  };
  window.dataHandler = function (data) {
    window.infoObjects = window.infoObjects.concat(data);
    for (let i = 0; i <= window.pinCount; i++) {
      createPin(window.infoObjects[i]["location"]["x"], window.infoObjects[i]["location"]["y"], window.infoObjects[i]["author"]["avatar"], window.infoObjects[i]["offer"]["title"]);
    }
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
