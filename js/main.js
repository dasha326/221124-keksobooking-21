'use strict';

const map = document.querySelector('.map');
const mapPinsContainer = document.querySelector('.map__pins')
const mapWidth = map.offsetWidth;
let infoObjects = [];

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
let makeElement = function (tagName, className, text, src) {
  let element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  if (src) {
    element.src = src;
  }
  return element;
};

let createPin = function (positionX, positionY, src, title) {
  let newPin = makeElement('button', 'map__pin');
  let pinImg = makeElement('img', undefined, undefined, src);
  pinImg.alt = title;
  newPin.setAttribute('style', 'left: ' + (positionX + 10) + 'px; top: ' + positionY + 'px;');
  newPin.appendChild(pinImg);
  mapPinsContainer.appendChild(newPin);
};

for (let i = 0; i <= 7; i++) {
  let randowCount = randomInteger(1, 4);
  let mapPositionY = randomInteger(130, 630);
  let mapPositionX = randomInteger(130, mapWidth);

  let type, rooms, guest, checkin, checkout;
  if (randowCount === 1) {
    type = 'palace';
    rooms = 10;
    guest = 8;
    checkin = '14:00';
    checkout = '13:00';
  }
  if (randowCount === 2) {
    type = 'flat';
    rooms = 2;
    guest = 3;
    checkin = '14:00';
    checkout = '12:00';
  }
  if (randowCount === 3) {
    type = 'house';
    rooms = 10;
    guest = 8;
    checkin = '12:00';
    checkout = '12:00';
  }
  if (randowCount === 4) {
    type = 'bungalow';
    rooms = 1;
    guest = 2;
    checkin = '14:00';
    checkout = '13:00';
  }
  infoObjects[i] =
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
  createPin(infoObjects[i]["location"]["x"], infoObjects[i]["location"]["y"], infoObjects[i]["author"]["avatar"], infoObjects[i]["offer"]["title"]);
}

