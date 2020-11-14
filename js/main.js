'use strict';
const MAX_PINS = 5;

window.updateElements = function (data) {
  let maxPins = data.length < MAX_PINS ? data.length : MAX_PINS;
  const pins = window.mapPinsContainer.querySelectorAll('.map__pin');
  const cards = document.querySelectorAll('.map__card');
  pins.forEach(function (element, index) {
    if (index > 0) {
      element.style.display = 'none';
    }
  });
  cards.forEach(function (element) {
    element.style.display = 'none';
  });
  for (let i = 0; i < maxPins; i++) {
    let userId = data[i].id;
    let activePin = document.querySelector('.map__pin[data-user="user-' + userId + '"]');
    activePin.style.display = 'block';
  };
};
window.dataHandler = function (data) {
  let pinsFragment = new DocumentFragment();
  let cardsFragment = new DocumentFragment();
  for (let i = 0; i < data.length; i++) {
    data[i].id = i;
    window.createPin(data[i][`location`][`x`], data[i][`location`][`y`], data[i][`author`][`avatar`], data[i][`offer`][`title`], i, pinsFragment);
    window.createCard(data[i]['offer']['title'], data[i]['offer']['address'], data[i]['offer']['price'], data[i]['offer']['type'], data[i]['offer']['rooms'], data[i]['offer']['guests'], data[i]['offer']['checkin'], data[i]['offer']['checkout'], data[i]['offer']['features'], data[i]['offer']['description'], data[i]['offer']['photos'], data[i][`author`][`avatar`], i, cardsFragment);
  }
  window.mapPinsContainer.append(pinsFragment);
  window.mapFilter.before(cardsFragment);
  window.elementsData = data;
  window.updateElements(window.elementsData);
};
window.backend.load(window.dataHandler, window.backend.errorMessage);
