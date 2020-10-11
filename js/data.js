'use strict';

(function () {
  for (let i = 0; i <= window.pinCount; i++) {
    let randomCount = window.util.randomInteger(1, 4);
    let mapPositionY = window.util.randomInteger(130, 630);
    let mapPositionX = window.util.randomInteger(130, window.mapWidth);
    let type, rooms, guest, checkin, checkout;


    if (randomCount === 1) {
      type = 'palace';
      rooms = 10;
      guest = 8;
      checkin = '14:00';
      checkout = '13:00';
    }
    if (randomCount === 2) {
      type = 'flat';
      rooms = 2;
      guest = 3;
      checkin = '14:00';
      checkout = '12:00';
    }
    if (randomCount === 3) {
      type = 'house';
      rooms = 10;
      guest = 8;
      checkin = '12:00';
      checkout = '12:00';
    }
    if (randomCount === 4) {
      type = 'bungalow';
      rooms = 1;
      guest = 2;
      checkin = '14:00';
      checkout = '13:00';
    }
    window.infoObjects[i] =
      {
        "author": {
          "avatar": 'img/avatars/user0' + (i + 1) + '.png'
        },
        "offer": {
          "title": 'строка, заголовок предложения',
          "address": '600, 350',
          "price": 0,
          "type": type,
          "rooms": rooms,
          "guests": guest,
          "checkin": checkin,
          "checkout": checkout,
          "features": [], // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
          "description": 'строка с описанием',
          "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
        },
        "location": {
          "x": mapPositionX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
          "y": mapPositionY
        }
      };
  }
})();
