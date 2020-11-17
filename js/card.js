'use strict';

(function () {
  // Create Card
  const cardTemplate = document.querySelector(`#card`).content;
  window.createCard = function (title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, avatar, number, fragment) {
    const newCard = cardTemplate.querySelector(`.map__card`).cloneNode(true);
    newCard.dataset.user = `user-` + number;
    newCard.style.display = `none`;

    // Title
    const cardTitle = newCard.querySelector(`.popup__title`);
    cardTitle.textContent = title;

    // Address
    const cardAddress = newCard.querySelector(`.popup__text--address`);
    cardAddress.textContent = address;

    // Price
    const cardPrice = newCard.querySelector(`.popup__text--price`);
    cardPrice.textContent = price + `₽/ночь`;

    // Type
    const cardType = newCard.querySelector(`.popup__type`);
    switch (type) {
      case `flat`:
        cardType.textContent = `Квартира`;
        break;
      case `bungalow`:
        cardType.textContent = `Бунгало`;
        break;
      case `house`:
        cardType.textContent = `Дом`;
        break;
      case `palace`:
        cardType.textContent = `Дворец`;
        break;
      default:
        cardType.textContent = `Не выбран`;
    }

    // Capacity
    const cardCapacity = newCard.querySelector(`.popup__text--capacity`);
    cardCapacity.textContent = rooms + ` комнаты для ` + guests + ` гостей`;

    // Time
    const cardTime = newCard.querySelector(`.popup__text--time`);
    cardTime.textContent = `Заезд после  ` + checkin + `, выезд до ` + checkout;

    // Features
    const cardFeatures = newCard.querySelector(`.popup__features`);
    let featuresText = ``;
    if (features.length > 0) {
      features.forEach(function (element, index, array) {
        featuresText += element + (index < array.length - 1 ? `, ` : ``);
      });
      features = featuresText;
      cardFeatures.textContent = features;
    } else {
      cardFeatures.style.display = `none`;
    }

    // Description
    const cardDescription = newCard.querySelector(`.popup__description`);
    cardDescription.textContent = description;

    // Photos
    const cardPhotos = newCard.querySelector(`.popup__photos`);
    const photosTemplate = new DocumentFragment();
    if (photos.length > 0) {
      photos.forEach(function (elem) {
        const newPhoto = cardTemplate.querySelector(`.popup__photo`).cloneNode();
        newPhoto.src = elem;
        photosTemplate.appendChild(newPhoto);
      });
      cardPhotos.replaceWith(photosTemplate);
    } else {
      cardPhotos.style.display = 'none';
    }

    // Avatar
    const cardAvatar = newCard.querySelector(`.popup__avatar`);
    cardAvatar.src = avatar;

    // Close btn
    const cardClose = newCard.querySelector(`.popup__close`);
    cardClose.addEventListener(`click`, function () {
      window.util.closeHandler(newCard);
    });
    cardClose.addEventListener(`keydown`, function (e) {
      window.util.isEnterEvent(e, window.util.closeHandler, newCard);
    });
    document.addEventListener(`keydown`, function (e) {
      window.util.isEscEvent(e, window.util.closeHandler, newCard);
    });

    fragment.append(newCard);
    return fragment;
  };

  window.openCard = function (userId) {
    const userCard = document.querySelectorAll(`.map__card`);
    userCard.forEach(function (element) {
      if (element.dataset.user === userId) {
        element.style.display = `block`;
      } else {
        element.style.display = `none`;
      }
    });
  };
})();
