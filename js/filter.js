'use strict';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const ALL_VALUE_NAME = `any`;
const MIDDLE_VALUE_NAME = `middle`;
const LOW_VALUE_NAME = `low`;
const HIGH_VALUE_NAME = `high`;
const filterForm = document.querySelector(`.map__filters`);
const housingType = filterForm.querySelector(`#housing-type`);
const housingPrice = filterForm.querySelector(`#housing-price`);
const housingRooms = filterForm.querySelector(`#housing-rooms`);
const housingGuests = filterForm.querySelector(`#housing-guests`);
const housingFeatures = filterForm.querySelector(`#housing-features`);

window.filterHandler = function (data, event) {
  const housingTypeValue = housingType.value;
  const housingPriceValue = housingPrice.value;
  let housingRoomsValue = housingRooms.value;
  let housingGuestsValue = housingGuests.value;
  let filterData = data;

  if (housingTypeValue !== ALL_VALUE_NAME) {
    filterData = data.filter(function (element) {
      return element[`offer`][`type`] === housingTypeValue;
    });
  } else {
    filterData = data;
  }
  if (housingPriceValue !== ALL_VALUE_NAME) {
    switch (housingPriceValue) {
      case MIDDLE_VALUE_NAME:
        filterData = filterData.filter(function (element) {
          return element[`offer`][`price`] >= MIN_PRICE && element[`offer`][`price`] <= MAX_PRICE;
        });
        break;
      case LOW_VALUE_NAME:
        filterData = filterData.filter(function (element) {
          return element[`offer`][`price`] < MIN_PRICE;
        });
        break;
      case HIGH_VALUE_NAME:
        filterData = filterData.filter(function (element) {
          return element[`offer`][`price`] > MAX_PRICE;
        });
        break;
    }
  }
  if (housingRoomsValue !== ALL_VALUE_NAME) {
    housingRoomsValue = parseInt(housingRoomsValue, 10);
    filterData = filterData.filter(function (element) {
      return element[`offer`][`rooms`] === housingRoomsValue;
    });
  }
  if (housingGuestsValue !== ALL_VALUE_NAME) {
    housingGuestsValue = parseInt(housingGuestsValue, 10);
    filterData = filterData.filter(function (element) {
      return element[`offer`][`guests`] === housingGuestsValue;
    });
  }

  if (event.target.matches(`input[type="checkbox"]`)) {
    let housingFeaturesItems = Array.from(housingFeatures.querySelectorAll(`input[type="checkbox"]:checked`));
    filterData = filterData.filter(function (element) {
      return housingFeaturesItems.every(function (item) {
        return element[`offer`][`features`].includes(item.value);
      });
    });
  }
  window.updateElements(filterData);
};
filterForm.addEventListener(`change`, function (e) {
  window.util.debounce(window.filterHandler(window.elementsData, e));
});
