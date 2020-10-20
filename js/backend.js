'use strict';
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      let url = 'https://21.javascript.pages.academy/keksobooking/data';
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      JSON.parse
      xhr.timeout = 10000;

      xhr.open('GET', url);
      xhr.send();

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 404:
            error = 'Файл не найден';
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('error', function () {
        onError(xhr.status);
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    },
    errorMessage: function (error) {
      let errorElement = document.createElement('div');
      errorElement.style.cssText = `
      position: fixed;
      background-color: #f0f0ea;
      color: #db1818;
      text-align: center;
      z-index: 9;
      width: 100%;
      padding: 10px;
      font-weight: bold;
      Font-size: 18px;`;
      errorElement.textContent = error;
      document.body.prepend(errorElement);
      setTimeout(function () {
        errorElement.remove();
      }, 10000);
    }
  };
})();
