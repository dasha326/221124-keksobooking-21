'use strict';
const MAX_PINS = 5;

window.updateElements = function (data) {
  const maxPins = data.length < MAX_PINS ? data.length : MAX_PINS;
  const pins = window.mapPinsContainer.querySelectorAll(`.map__pin`);
  const cards = document.querySelectorAll(`.map__card`);
  pins.forEach(function (element, index) {
    if (index > 0) {
      element.style.display = `none`;
    }
  });
  cards.forEach(function (element) {
    element.style.display = `none`;
  });
  for (let i = 0; i < maxPins; i++) {
    const userId = data[i].id;
    const activePin = document.querySelector(`.map__pin[data-user="user-` + userId + `"]`);
    activePin.style.display = `block`;
  }
};
window.dataHandler = function (data) {
  const pinsFragment = new DocumentFragment();
  const cardsFragment = new DocumentFragment();
  for (let i = 0; i < data.length; i++) {
    data[i].id = i;
    if (Object.keys(data[i][`offer`]).length > 0) {
      window.createPin(data[i][`location`][`x`], data[i][`location`][`y`], data[i][`author`][`avatar`], data[i][`offer`][`title`], i, pinsFragment);
      window.createCard(data[i][`offer`][`title`], data[i][`offer`][`address`], data[i][`offer`][`price`], data[i][`offer`][`type`], data[i][`offer`][`rooms`], data[i][`offer`][`guests`], data[i][`offer`][`checkin`], data[i][`offer`][`checkout`], data[i][`offer`][`features`], data[i][`offer`][`description`], data[i][`offer`][`photos`], data[i][`author`][`avatar`], i, cardsFragment);
    }
  }
  window.mapPinsContainer.append(pinsFragment);
  window.mapFilter.before(cardsFragment);
  window.elementsData = data;
  window.updateElements(window.elementsData);
};
