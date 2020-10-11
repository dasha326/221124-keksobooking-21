'use strict';
(function () {
  window.util = {
    randomInteger: function (min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
    makeElement: function (tagName, className, text, src) {
      let element = document.createElement(tagName);
      element.classList.add(className);
      if (text) {
        element.textContent = text;
      }
      if (src) {
        element.src = src;
      }
      return element;
    },
    addActiveClass: function () {
      window.addFormFieldsets.forEach(function (element) {
        element.removeAttribute('disabled');
      });
      window.map.classList.remove('map--faded');
      window.addForm.classList.remove('ad-form--disabled');
    },
  };
})();
