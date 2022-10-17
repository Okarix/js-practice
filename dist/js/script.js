/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', function () {
  // Tabs
  let tabs = document.querySelectorAll('.tabheader__item'),
      //селектор одиночного таба
  tabsContent = document.querySelectorAll('.tabcontent'),
      //содержимое таба, контент
  tabsParent = document.querySelector('.tabheader__items'); //родитель табов

  function hideFunc() {
    //функция на скрытие элементов
    tabsContent.forEach(item => {
      // переюираем контент таба
      item.style.display = 'none'; //скрывает контент у каждого таба
    });
    tabs.forEach(item => {
      //перебираем каждый таб по отдельности
      item.classList.remove('tabheader__item_active'); // и если на каком-то назначен класс активности, то убираем его.
    });
  }

  function showFunc(i = 0) {
    //функция показа. инначально активен тот, у которого индекс 0. то есть, 1ый элемент.
    tabsContent[i].style.display = 'block'; //содержимое таба который будет под индексом = 0, станет видимое т.к. display=block

    tabs[i].classList.add('tabheader__item_active'); // так же этому табу назначается класс активности
  }

  hideFunc(); //скрываем всех сразу

  showFunc(); // показываем всем сразу, но т.к. аргумент не передан, то никого не показываем.

  tabsParent.addEventListener('click', event => {
    // делигирование события. назначаем клик на родителя табов, листенер следит событием и записывает все в эвент.
    let target = event.target; // для удобства.

    if (target && target.classList.contains('tabheader__item')) {
      // если таргет эвента И таргет эвента совпадает с селектором tabheader__item
      tabs.forEach((item, i) => {
        // то перебираем все элементы и их индексы.
        if (target == item) {
          // если эвент совпал с элементом, 
          hideFunc(); //то скрываем всех(на случай если кто-то уже был активен)

          showFunc(i); // и показываем только того, на кого кликнули.
        }
      });
    }
  }); // Timer

  const deadline = '2022-10-27'; //  конечная дата

  function getTimeRemaining(endtime) {
    //функция по расчету промежутков
    let days, hours, minutes, seconds; // объявляем переменные здесь так как ниже будет условие

    const t = Date.parse(endtime) - Date.parse(new Date()); // создаем локальную переменную в которую методом Date.parse разбираем строковое значение и переводим его в милисекунды. от этих милисекунд отнимаем также переведенное в милисекунды ВРЕМЯ ДАТЫ ИЗ СИСТЕМЫ. получаем разницу которую и будет отщитывать таймер.

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); //  вычисляем дни. выводим разультат без остатся через math.floor. РАЗНИЦУ делим на произведение (тысяча милисекунд  умноженые на 60(так получаем количество милисекунд в одной минуте) умноженые ещё раз на 60(получаем сколько в одном часе) и умножаем еще раз на 24 часа(и получаем сколько в сутках будет милисекунд) ). арифметика в скобках - получение милисекунд в одних сутках.  разницу в милисекундах делим на милисекунды в одних сутках и получаем СКОЛЬКО СУТОК ОСТАЛОСЬ ДО ОКОНЧАНИЕ НАШЕЙ ДАТЫ.

      hours = Math.floor(t / (1000 * 60 * 60) % 24); // (нашу разницу милисекунд делим на количество милисекунд в одном часе) делим это % на 24 и % возвращает нам остаток от деления. (пример%: 5 % 2 = 1.  5/2=4 и 1 в остатке)

      minutes = Math.floor(t / 1000 / 60 % 60); // (разницу делим на 1000 и получаем количество секунд которые у нас есть, потом делим на 60 и получаем количество минут) % 60 т.к. в одной минуте шестьдесят секунд. и получаем остаток деления минут. (примечание: он не должен быть больше чем 60).

      seconds = Math.floor(t / 1000 % 60); // (остаток делем на 100 и получаем колиество секунд внутри милисекунд) и % остаток от 60. 
    }

    return {
      //функция возвращает обьект в котором на основе расчетов получены отдельные данные.
      'total': t,
      // разница
      'days': days,
      // дни
      'hours': hours,
      //часы
      'minutes': minutes,
      //минуты
      'seconds': seconds //секунды

    };
  }

  function getZero(num) {
    // добавления нуля к числам до 10. если было 2 останет 02. было 6 станет 06. 10 и дальше не изменяется т.к. двухзначное. аргументом передается какое-то число.
    if (num >= 0 && num < 10) {
      // сработает если число больше или равно нули И меньше десяти.
      return `0${num}`; //возвращаем добавочный ноль и то число которое было передано в аргумент.
    } else {
      // если число больше 10
      return num; // просто возвращаем его и ничего не делаем т.к. не надо.
    }
  }

  function setClock(selector, endtime) {
    // функция установки таймера на страничке. принимает 2 аргумента.
    //элементы со страницы:
    const timer = document.querySelector(selector),
          // переменная таймер - получаем в нее таймер. если их на странице будет несколько, то их селектор передается сюда первым аргументом.
    days = timer.querySelector('#days'),
          // получаем айди #days обращаясь не к документу а сразу к таймеру
    hours = timer.querySelector('#hours'),
          // получаем айди #hours обращаясь не к документу а сразу к таймеру
    minutes = timer.querySelector('#minutes'),
          // получаем айди #minutes обращаясь не к документу а сразу к таймеру
    seconds = timer.querySelector('#seconds'),
          // получаем айди #seconds обращаясь не к документу а сразу к таймеру
    timeInterval = setInterval(updateClock, 1000); // устанавливаем, что с интервалом в секунду будем запускать функцию updateClock. имитация стрелки часов. тик-так :)

    updateClock(); // запускается тут, для того, что бы не было скачков и она начинала действовать с момента загрузки страницы.

    function updateClock() {
      // помещаем таймер на страницу. теперь об будет виден глазу.
      const t = getTimeRemaining(endtime); // в локальную переменную  засовываем "функция по расчету промежутков" написаную первой(которая вычисляет всё и переносит итоги в обьект). теперь в t хранится этот обьект с уже полученными данными.
      // закидываем всё это дело в верстку

      days.innerHTML = getZero(t.days); // в полученный выше (days = timer.querySelector('#days')) #days закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.

      hours.innerHTML = getZero(t.hours); // в полученный выше (hours = timer.querySelector('#hours')) #hours закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.

      minutes.innerHTML = getZero(t.minutes); // в полученный выше (minutes = timer.querySelector('#minutes')) #minutes закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.

      seconds.innerHTML = getZero(t.seconds); // в полученный выше (seconds = timer.querySelector('#seconds')) #seconds закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.

      if (t.total <= 0) {
        // проверяем у обьекта созданного первой функцией getTimeRemaining() свойство total, и если оно равняется нулю, значит таймер истек, интервал останавливается и таймер больше не идет.
        clearInterval(timeInterval); // собственно сама отмена таймера.
      }
    }
  }

  setClock('.timer', deadline); // запускаем функцию установки времени для определенного таймера. передаем первым аргументом тот таймер на сайте на который нужно установить отсчет. а вторым аргументом сам дедлайн в формате строчки 
  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        // кнопки которые будут триггерить наше модальное окно(открывает)
  modal = document.querySelector('.modal'),
        // получаем само модальное окно
  modalCloseBtn = document.querySelector('[data-close]'); // кнопка закрытия окна

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
      // modal.classList.add('show');
      // modal.classList.remove('hide');
      modal.classList.toggle('hide');
      document.body.style.overflow = 'hidden'; // запрещаем скроллить
    }); // показываем наше модальное окно
  }); // используем метод для перебора всех кнопок на странице  

  function closeModal() {
    // modal.classList.add('hide');
    // modal.classList.remove('show');
    modal.classList.toggle('hide');
    document.body.style.overflow = ''; // разрешаем скроллить
  }

  modalCloseBtn.addEventListener('click', closeModal); // закрываем наше окно

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  }); // закрываем окно по нажатию на подложку

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hide')) {
      closeModal();
    }
  }); // будем закрывать наше окно по нажатию на клавишу esc
}); //техническая функция загрузки DOM

/***/ })

/******/ });
//# sourceMappingURL=script.js.map