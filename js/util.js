'use strict';
(function () {
  const ESC_KEYCODE = `Escape`;
  const ENTER_KEYCODE = `Enter`;
  const DEBOUNCE_INTERVAL = 300;
  window.map = document.querySelector(`.map`);
  window.mapWidth = window.map.offsetWidth;
  window.mapPinsContainer = document.querySelector(`.map__pins`);
  window.addressField = document.querySelector(`#address`);
  window.addForm = document.querySelector(`.ad-form`);
  window.addFormFieldsets = window.addForm.querySelectorAll(`fieldset`);
  window.mapFilter = document.querySelector(`.map__filters-container`);
  window.elementsData = [];

  window.util = {
    isEscEvent(e, action, param) {
      if (e.key === ESC_KEYCODE) {
        action(param);
      }
    },
    isEnterEvent(e, action, element) {
      if (e.key === ENTER_KEYCODE) {
        action(element);
      }
    },
    addActive() {
      window.addFormFieldsets.forEach(function (element) {
        element.removeAttribute(`disabled`);
      });
      window.map.classList.remove(`map--faded`);
      window.addForm.classList.remove(`ad-form--disabled`);
      window.backend.load(window.dataHandler, window.backend.errorMessage);
    },
    removeActive() {
      window.addFormFieldsets.forEach(function (element) {
        element.setAttribute(`disabled`, `disabled`);
      });
      window.map.classList.add(`map--faded`);
      window.addForm.classList.add(`ad-form--disabled`);
      window.addForm.reset();
    },
    validMessage(element, message) {
      element.setCustomValidity(message);
    },
    closeHandler(element) {
      element.style.display = `none`;
    },
    debounce(cb) {
      let lastTimeout = null;
      return function (...parameters) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb(...parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
