'use strict';

(function () {
  const roomNumberField = document.querySelector('#room_number');
  const capacityField = document.querySelector('#capacity');
  const capacityFieldOptions = document.querySelectorAll('#capacity option');
  const addressField = document.querySelector('#address');
  let resetSelectOption = function (select, option) {
    select.value = '';
    option.forEach(function (element) {
      if (element.value !== '') {
        element.disabled = true;
      }
    });
  };

  addressField.value = window.startPinLocation.x + ', ' + window.startPinLocation.y;
  resetSelectOption(capacityField, capacityFieldOptions);

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
    resetSelectOption(capacityField, capacityFieldOptions);
    activateCapacityFieldOption(roomNumberField.value, capacityField);
  });

})();
