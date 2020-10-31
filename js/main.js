'use strict';

window.dataHandler = function (data) {
  let pinsFragment = new DocumentFragment();
  let cardsFragment = new DocumentFragment();
  for (let i = 0; i < data.length; i++) {
    window.createPin(data[i][`location`][`x`], data[i][`location`][`y`], data[i][`author`][`avatar`], data[i][`offer`][`title`], i, pinsFragment);
    window.createCard(data[i]['offer']['title'], data[i]['offer']['address'], data[i]['offer']['price'], data[i]['offer']['type'], data[i]['offer']['rooms'], data[i]['offer']['guests'], data[i]['offer']['checkin'], data[i]['offer']['checkout'], data[i]['offer']['features'], data[i]['offer']['description'], data[i]['offer']['photos'], data[i][`author`][`avatar`], i, cardsFragment);
  }
  window.mapPinsContainer.append(pinsFragment);
  window.mapFilter.before(cardsFragment);

  // let userPins = document.querySelectorAll('.map__pin');
  // userPins.forEach(function (element) {
  //
  // });
};
window.backend.load(window.dataHandler, window.backend.errorMessage);


