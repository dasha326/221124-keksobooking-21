'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const titleField = document.querySelector('#title');
  const typeField = document.querySelector('#type');
  const priceField = document.querySelector('#price');
  const roomNumberField = document.querySelector('#room_number');
  const capacityField = document.querySelector('#capacity');
  const capacityFieldOptions = document.querySelectorAll('#capacity option');
  const timeinField = document.querySelector('#timein');
  const timeoutField = document.querySelector('#timeout');
  const sendBtn = document.querySelector('.ad-form__element--submit');
  const resetBtn = document.querySelector('.ad-form__reset');
  const requiredInputs = window.addForm.querySelectorAll('input[required]')

  let resetSelectOption = function (select, option) {
    select.value = '';
    option.forEach(function (element) {
      if (element.value !== '') {
        element.disabled = true;
      }
    });
  };
  let activateCapacityFieldOption = function (count, elements) {
    count = parseInt(count, 10);
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
  let changeCapacityField = function() {
    resetSelectOption(capacityField, capacityFieldOptions);
    activateCapacityFieldOption(roomNumberField.value, capacityField);
  };

  window.addressField.value = window.startPinLocation.x + ', ' + window.startPinLocation.y;
  changeCapacityField();

  roomNumberField.addEventListener('change', function () {
    changeCapacityField();
  });

  typeField.addEventListener('change', function () {
    switch (typeField.value) {
      case 'bungalow':
        priceField.placeholder = 0;
        break;
      case 'flat':
        priceField.placeholder = 1000;
        break;
      case 'house':
        priceField.placeholder = 5000;
        break;
      case 'palace':
        priceField.placeholder = 10000;
        break;
    }
  });

  // Validate
  let titleValid = function (element) {
    let valueLength = element.value.length;
    let minErrorMessage = 'Минимальное колличество символов: ' + MIN_TITLE_LENGTH + '. У вас: ' + valueLength;
    let maxErrorMessage = 'Минимальное колличество символов: ' + MAX_TITLE_LENGTH + '. У вас: ' + valueLength;
    if (valueLength < MIN_TITLE_LENGTH) {
      window.util.validMessage(element, minErrorMessage);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      window.util.validMessage(element, maxErrorMessage);
    } else {
      window.util.validMessage(element, '');
    }
    element.reportValidity();
  };
  let click = 1;
  titleField.addEventListener('focus', function () {
    if (click > 1) {
      titleField.addEventListener('input', function () {
        titleValid(this);
      });
    }
    click++;
  });
  titleField.addEventListener('blur', function () {
    titleValid(this);
  });

  priceField.addEventListener('blur', function () {
    let price = parseInt(this.value, 10);
    let type = typeField.value;
    let minErrorMessage = 'Минимальная цена за ночь: ';
    let maxErrorMessage = 'Вы превысили максимальную цену за ночь ';
    switch (type) {
      case 'flat':
        if (price < 1000) {
          window.util.validMessage(this, minErrorMessage + '1000');
        } else {
          window.util.validMessage(this, '');
        }
        break;
      case 'house':
        if (price < 5000) {
          window.util.validMessage(this, minErrorMessage + '5000');
        } else {
          window.util.validMessage(this, '');
        }
        break;
      case 'palace':
        if (price < 10000) {
          window.util.validMessage(this, minErrorMessage + '10000');
        } else {
          window.util.validMessage(this, '');
        }
        break;
    }
    if (price > 1000000) {
      window.util.validMessage(this, maxErrorMessage);
    } else {
      window.util.validMessage(this, '');
    }
    this.reportValidity();
  });

  timeinField.addEventListener('change', function () {
    timeoutField.value = this.value;
  });
  timeoutField.addEventListener('change', function () {
    timeinField.value = this.value;
  });

  let createError = function () {
    let newErrorTemplate = document.querySelector('#error').content;
    let newError = newErrorTemplate.querySelector('.error').cloneNode(true);
    let newErrorCloseBtn = newError.querySelector('.error__button');

    newErrorCloseBtn.addEventListener('click', function () {
      newError.remove();
    });
    document.querySelector('main').append(newError);
  };
  let createSuccess = function () {
    let newSuccessTemplate = document.querySelector('#success').content;
    let newSuccess = newSuccessTemplate.querySelector('.success').cloneNode(true);
    document.addEventListener('keydown', function (e) {
      window.util.isEscEvent(e, successClose, newSuccess);
    });
    document.addEventListener('click', function () {
      successClose(newSuccess);
    });
    document.querySelector('main').append(newSuccess);
    window.util.removeActive();
  };
  let successClose = function (element) {
    element.remove();
  };

  let addInvalidStyle = function (element) {
    element.addEventListener('invalid', function (e) {
      if (element.validity.valid === false) {
        element.classList.add('error-input');
      }
    });
  };
  requiredInputs.forEach(function (element) {
    addInvalidStyle(element);
  })

  window.addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    window.backend.upload(new FormData(window.addForm), createSuccess, createError);
  });

  // Reset form
  resetBtn.addEventListener('click', function () {
    let addressValue = window.addressField.value;
    window.addForm.reset();
    setTimeout(function () {
      window.addressField.value = addressValue;
    }, 0);
  });
})();
