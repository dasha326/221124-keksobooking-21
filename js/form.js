'use strict';

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const BUNGALOW_MIN_PRICE = 0;
  const FLAT_MIN_PRICE = 1000;
  const HOUSE_MIN_PRICE = 5000;
  const PALACE_MIN_PRICE = 10000;
  const MAX_PRICE = 1000000;
  const addressValue = Math.floor(window.startPinLocation.x) + `, ` + Math.floor(window.startPinLocation.y);
  const titleField = document.querySelector(`#title`);
  const typeField = document.querySelector(`#type`);
  const priceField = document.querySelector(`#price`);
  const roomNumberField = document.querySelector(`#room_number`);
  const capacityField = document.querySelector(`#capacity`);
  const capacityFieldOptions = document.querySelectorAll(`#capacity option`);
  const timeinField = document.querySelector(`#timein`);
  const timeoutField = document.querySelector(`#timeout`);
  const avatarField = document.querySelector(`#avatar`);
  const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
  const photosField = document.querySelector(`#images`);
  const photosPreviewContainer = document.querySelector(`.ad-form__photo`);
  const resetBtn = document.querySelector(`.ad-form__reset`);
  const requiredInputs = window.addForm.querySelectorAll(`input[required]`);

  const resetFormHandler = function () {
    window.addForm.reset();
    setTimeout(function () {
      window.addressField.value = addressValue;
    }, 0);
  };
  const resetSelectOption = function (select, option) {
    select.value = ``;
    option.forEach(function (element) {
      if (element.value !== ``) {
        element.disabled = true;
      }
    });
  };
  const activateCapacityFieldOption = function (count, elements) {
    count = parseInt(count, 10);
    if (count <= 3) {
      for (let i = count; i > 0; i--) {
        let element = elements.querySelector(`[value="` + i + `"]`);
        element.disabled = false;
      }
    } else if (count === 100) {
      count = 0;
      const element = elements.querySelector(`[value="` + count + `"]`);
      element.disabled = false;
    }
  };
  const changeCapacityField = function () {
    resetSelectOption(capacityField, capacityFieldOptions);
    activateCapacityFieldOption(roomNumberField.value, capacityField);
  };

  window.addressField.value = addressValue;
  changeCapacityField();

  roomNumberField.addEventListener(`change`, function () {
    changeCapacityField();
  });

  typeField.addEventListener(`change`, function () {
    switch (typeField.value) {
      case `bungalow`:
        priceField.placeholder = BUNGALOW_MIN_PRICE;
        break;
      case `flat`:
        priceField.placeholder = FLAT_MIN_PRICE;
        break;
      case `house`:
        priceField.placeholder = HOUSE_MIN_PRICE;
        break;
      case `palace`:
        priceField.placeholder = PALACE_MIN_PRICE;
        break;
    }
  });

  // Validate
  const titleValidate = function (element) {
    const valueLength = element.value.length;
    const minErrorMessage = `Минимальное колличество символов: ` + MIN_TITLE_LENGTH + `. У вас: ` + valueLength;
    const maxErrorMessage = `Минимальное колличество символов: ` + MAX_TITLE_LENGTH + `. У вас: ` + valueLength;
    if (valueLength < MIN_TITLE_LENGTH) {
      window.util.validMessage(element, minErrorMessage);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      window.util.validMessage(element, maxErrorMessage);
    } else {
      window.util.validMessage(element, ``);
    }
    element.reportValidity();
  };
  let click = 1;
  titleField.addEventListener(`focus`, function () {
    if (click > 1) {
      titleField.addEventListener(`input`, function () {
        titleValidate(titleField);
      });
    }
    click++;
  });
  titleField.addEventListener(`blur`, function () {
    titleValidate(titleField);
  });

  priceField.addEventListener(`blur`, function () {
    const price = parseInt(priceField.value, 10);
    const type = typeField.value;
    const minErrorMessage = `Минимальная цена за ночь: `;
    const maxErrorMessage = `Вы превысили максимальную цену за ночь `;
    switch (type) {
      case `flat`:
        if (price < FLAT_MIN_PRICE) {
          window.util.validMessage(priceField, minErrorMessage + `1000`);
        } else {
          window.util.validMessage(priceField, ``);
        }
        break;
      case `house`:
        if (price < HOUSE_MIN_PRICE) {
          window.util.validMessage(priceField, minErrorMessage + `5000`);
        } else {
          window.util.validMessage(priceField, ``);
        }
        break;
      case `palace`:
        if (price < PALACE_MIN_PRICE) {
          window.util.validMessage(priceField, minErrorMessage + `10000`);
        } else {
          window.util.validMessage(priceField, ``);
        }
        break;
    }
    if (price > MAX_PRICE) {
      window.util.validMessage(priceField, maxErrorMessage);
    } else {
      window.util.validMessage(priceField, ``);
    }
    priceField.reportValidity();
  });

  timeinField.addEventListener(`change`, function () {
    timeoutField.value = timeinField.value;
  });
  timeoutField.addEventListener(`change`, function () {
    timeinField.value = timeoutField.value;
  });

  function showAvatar(e) {
    if (window.FileReader) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = function () {
        avatarPreview.src = reader.result;
      };
    }
  }
  avatarField.addEventListener(`change`, showAvatar, false);

  function showFiles(e) {
    if (window.FileReader) {
      const file = e.target.files[0];
      const img = document.createElement('img');
      const reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = function () {
        img.src = reader.result;
        photosPreviewContainer.appendChild(img);
      };
    }
  }
  photosField.addEventListener(`change`, showFiles, false);

  const createError = function () {
    const newErrorTemplate = document.querySelector(`#error`).content;
    const newError = newErrorTemplate.querySelector(`.error`).cloneNode(true);
    const newErrorCloseBtn = newError.querySelector(`.error__button`);

    newErrorCloseBtn.addEventListener(`click`, function () {
      newError.remove();
    });
    document.querySelector(`main`).append(newError);
  };
  const createSuccess = function () {
    const resetData = [];
    const newSuccessTemplate = document.querySelector(`#success`).content;
    const newSuccess = newSuccessTemplate.querySelector(`.success`).cloneNode(true);
    document.addEventListener(`keydown`, function (e) {
      window.util.isEscEvent(e, successClose, newSuccess);
    });
    document.addEventListener(`click`, function () {
      successClose(newSuccess);
    });
    document.querySelector(`main`).append(newSuccess);
    resetFormHandler();
    window.updateElements(resetData);
  };
  const successClose = function (element) {
    element.remove();
  };

  const addInvalidStyle = function (element) {
    element.addEventListener(`invalid`, function () {
      if (element.validity.valid === false) {
        element.classList.add(`error-input`);
      }
    });
  };
  requiredInputs.forEach(function (element) {
    addInvalidStyle(element);
  });

  window.addForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
    window.backend.upload(new FormData(window.addForm), createSuccess, createError);
  });

  // Reset form
  resetBtn.addEventListener(`click`, function () {
    resetFormHandler();
  });
})();
