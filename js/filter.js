'use strict';
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelector('#housing-features');

window.filterHandler = function (data, event) {
  let housingTypeValue = housingType.value;
  let housingPriceValue = housingPrice.value;
  let housingRoomsValue = housingRooms.value;
  let housingGuestsValue = housingGuests.value;
  let housingFeaturesValue = [];
  let filterData = data;

  if (housingTypeValue !== 'any') {
    filterData = data.filter(function (element) {
      return element['offer']['type'] === housingTypeValue;
    });
  } else {
    filterData = data;
  }
  if (housingPriceValue !== 'any') {
    switch (housingPriceValue) {
      case "middle":
        filterData = filterData.filter(function (element) {
          return element['offer']['price'] >= MIN_PRICE && element['offer']['price'] <= MAX_PRICE;
        });
        break;
      case "low":
        filterData = filterData.filter(function (element) {
          return element['offer']['price'] < MIN_PRICE;
        });
        break;
      case "high":
        filterData = filterData.filter(function (element) {
          return element['offer']['price'] > MAX_PRICE;
        });
        break;
    }
  }
  if (housingRoomsValue !== 'any') {
    housingRoomsValue = parseInt(housingRoomsValue, 10);
    filterData = filterData.filter(function (element) {
      return element['offer']['rooms'] === housingRoomsValue;
    });
  }
  if (housingGuestsValue !== 'any') {
    housingGuestsValue = parseInt(housingGuestsValue, 10);
    filterData = filterData.filter(function (element) {
      return element['offer']['guests'] === housingGuestsValue;
    });
  }

  if (event.target.matches('input[type="checkbox"]')) {
    let housingFeaturesItems = housingFeatures.querySelectorAll('input[type="checkbox"]:checked');
    let housingFeaturesFilterData;
    housingFeaturesItems.forEach(function (el) {
      housingFeaturesFilterData = filterData.filter(function (element) {
        return element['offer']['features'].filter(function (item) {
          return item === el.value;
        });
      });
      console.log(housingFeaturesFilterData);
    });
    console.log('housingFeaturesFilterData' + housingFeaturesFilterData);
  }
  window.updateElements(filterData);
};
filterForm.addEventListener('change', function (e) {
  window.filterHandler(window.elementsData, e);
});
