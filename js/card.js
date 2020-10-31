'use strict';

(function () {
  // Create Card
  const cardTemplate = document.querySelector('#card').content;
  window.createCard = function (title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, avatar, number, fragment) {
    let newCard = cardTemplate.querySelector('.map__card').cloneNode(true);
    newCard.dataset.user = 'user-' + number;
    newCard.style.display = 'none';

    // Title
    let cardTitle = newCard.querySelector('.popup__title');
    cardTitle.textContent = title;

    // Address
    let cardAddress = newCard.querySelector('.popup__text--address');
    cardAddress.textContent = address;

    // Price
    let cardPrice = newCard.querySelector('.popup__text--price');
    cardPrice.textContent = price + '₽/ночь';

    // Type
    let cardType = newCard.querySelector('.popup__type');
    switch (type) {
      case 'flat':
        cardType.textContent = 'Квартира';
        break;
      case 'bungalow':
        cardType.textContent = 'Бунгало';
        break;
      case 'house':
        cardType.textContent = 'Дом';
        break;
      case 'palace':
        cardType.textContent = 'Дворец';
        break;
      default:
        cardType.textContent = 'Не выбран';
    }

    // Capacity
    let cardCapacity = newCard.querySelector('.popup__text--capacity');
    cardCapacity.textContent = rooms + ' комнаты для ' + guests + ' гостей';

    // Time
    let cardTime = newCard.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после  ' + checkin + ', выезд до ' + checkout;

    // Features
    let cardFeatures = newCard.querySelector('.popup__features');
    cardFeatures.textContent = features;

    // Description
    let cardDescription = newCard.querySelector('.popup__description');
    cardDescription.textContent = description;

    // Photos
    let cardPhotos = cardTemplate.querySelector('.popup__photos');
    let photosTemplate = new DocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      let newPhoto = cardTemplate.querySelector('.popup__photo').cloneNode();
      newPhoto.src = photos[i];
      photosTemplate.appendChild(newPhoto);
    }
    cardPhotos.append(photosTemplate);

    // Avatar
    let cardAvatar = newCard.querySelector('.popup__avatar');
    cardAvatar.src = avatar;

    // Close btn
    let cardClose = newCard.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      window.closeCard(newCard);
    });
    cardClose.addEventListener('keydown', function (e) {
      window.util.isEnterEvent(e, window.closeCard, newCard);
    });
    document.addEventListener('keydown', function (e) {
      window.util.isEscEvent(e, window.closeCard, newCard);
    });

    fragment.append(newCard);
    return fragment;
  };

  window.openCard = function (userId) {
    let userCard = document.querySelectorAll('.map__card');
    userCard.forEach(function (element) {
      if (element.dataset.user === userId) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  };
  window.closeCard = function (element) {
    element.style.display = 'none';
  };
})();
