'use strict';
const mapFilter = document.querySelector('.map__filters-container');

window.dataHandler = function (data) {
  let pinsFragment = new DocumentFragment();
  let cardsFragment = new DocumentFragment();
  for (let i = 0; i < data.length; i++) {
    window.createPin(data[i][`location`][`x`], data[i][`location`][`y`], data[i][`author`][`avatar`], data[i][`offer`][`title`], pinsFragment);
    window.createCard(data[i]['offer']['title'], data[i]['offer']['address'], data[i]['offer']['price'], data[i]['offer']['type'], data[i]['offer']['rooms'], data[i]['offer']['guests'], data[i]['offer']['checkin'], data[i]['offer']['checkout'], data[i]['offer']['features'], data[i]['offer']['description'], data[i]['offer']['photos'], data[i][`author`][`avatar`], cardsFragment);
  }
  window.mapPinsContainer.append(pinsFragment);
  mapFilter.before(cardsFragment);
};
window.backend.load(window.dataHandler, window.backend.errorMessage);
