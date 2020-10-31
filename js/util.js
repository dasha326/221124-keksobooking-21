'use strict';
(function () {
  const ESC_KEYCODE = 'Escape';
  const ENTER_KEYCODE = 'Enter';
  window.map = document.querySelector('.map');
  window.mapWidth = window.map.offsetWidth;
  window.mapPinsContainer = document.querySelector('.map__pins');
  window.addForm = document.querySelector('.ad-form');
  window.addFormFieldsets = window.addForm.querySelectorAll('fieldset');
  window.mapFilter = document.querySelector('.map__filters-container');

  window.util = {
    randomInteger: function (min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    isEscEvent: function (e, action, param) {
      if (e.key === ESC_KEYCODE) {
        action(param);
      }
    },
    isEnterEvent: function (e, action, element) {
      if (e.key === ENTER_KEYCODE) {
        action(element);
      }
    },
    addActiveClass: function () {
      window.addFormFieldsets.forEach(function (element) {
        element.removeAttribute('disabled');
      });
      window.map.classList.remove('map--faded');
      window.addForm.classList.remove('ad-form--disabled');
    },
    validMessage: function (element, message) {
      element.setCustomValidity(message);
    }
  };
})();
