'use strict';
const map = document.querySelector('.map');
const mapPinsContainer = document.querySelector('.map__pins');
const startPin = document.querySelector('.map__pin--main');
const mapWidth = map.offsetWidth;
const mainPin = document.querySelector('.map__pin--main');
const addForm = document.querySelector('.ad-form');
const addFormFieldSets = addForm.querySelectorAll('fieldset');
const roomNumberField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const capacityFieldOptions = document.querySelectorAll('#capacity option');
const addressField = document.querySelector('#address');
let infoObjects = [];


let startPinLocation = {
  x: parseInt(startPin.style.left) - startPin.offsetWidth / 2,
  y: parseInt(startPin.style.top) - startPin.offsetHeight
};

addressField.value = startPinLocation.x + ', ' + startPinLocation.y;

let addActiveClass = function () {
  addFormFieldSets.forEach(function (element) {
    element.removeAttribute('disabled');
  });
  map.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
};

addFormFieldSets.forEach(function (element) {
  element.setAttribute('disabled', 'disabled');
});

mainPin.addEventListener('mousedown', function (e) {
  if (e.button === 0) {
    addActiveClass();
  }
});
mainPin.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addActiveClass();
  }
});

let resetFieldOption = function () {
  capacityField.value = '';
  capacityFieldOptions.forEach(function (element) {
    if (element.value !== '') {
      element.disabled = true;
    }
  });
};
resetFieldOption();
let activateCapacityFieldOption = function (count, elements) {
  count = parseInt(count);
  if (count <= 3) {
    for (let i = count; i > 0; i--) {
      let element = elements.querySelector('[value="' + i + '"]')
      element.disabled = false;
    }
  } else if (count === 100) {
    count = 0;
    let element = elements.querySelector('[value="' + count + '"]');
    element.disabled = false;
  }
};
roomNumberField.addEventListener('change', function () {
  resetFieldOption();
  activateCapacityFieldOption(roomNumberField.value, capacityField);
});


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
  newPin.setAttribute('style', 'left: ' + (positionX - newPin.offsetWidth) + 'px; top: ' + (positionY - newPin.offsetHeight) + 'px;');
  newPin.appendChild(pinImg);
  mapPinsContainer.appendChild(newPin);
};

for (let i = 0; i <= 0; i++) {
  let randowCount = randomInteger(1, 4);
  let mapPositionY = randomInteger(130, 630);
  let mapPositionX = randomInteger(130, mapWidth);
console.log(mapPositionY, mapPositionX);
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
        "address": 'Улица Тестовая, д. 5',
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

