window.addEventListener('DOMContentLoaded', function () {

    // Tabs
    let tabs = document.querySelectorAll('.tabheader__item'), //селектор одиночного таба
        tabsContent = document.querySelectorAll('.tabcontent'), //содержимое таба, контент
        tabsParent = document.querySelector('.tabheader__items'); //родитель табов

    function hideFunc() {   //функция на скрытие элементов
        tabsContent.forEach(item => { // переюираем контент таба
            item.style.display = 'none'; //скрывает контент у каждого таба
        });
        tabs.forEach(item => { //перебираем каждый таб по отдельности
            item.classList.remove('tabheader__item_active'); // и если на каком-то назначен класс активности, то убираем его.
        });
    }

    function showFunc(i = 0) {  //функция показа. инначально активен тот, у которого индекс 0. то есть, 1ый элемент.
        tabsContent[i].style.display = 'block'; //содержимое таба который будет под индексом = 0, станет видимое т.к. display=block
        tabs[i].classList.add('tabheader__item_active'); // так же этому табу назначается класс активности

    }

    hideFunc(); //скрываем всех сразу
    showFunc(); // показываем всем сразу, но т.к. аргумент не передан, то никого не показываем.

    tabsParent.addEventListener('click', (event) => { // делигирование события. назначаем клик на родителя табов, листенер следит событием и записывает все в эвент.
        let target = event.target; // для удобства.
        if (target && target.classList.contains('tabheader__item')) { // если таргет эвента И таргет эвента совпадает с селектором tabheader__item
            tabs.forEach((item, i) => { // то перебираем все элементы и их индексы.
                if (target == item) { // если эвент совпал с элементом, 
                    hideFunc(); //то скрываем всех(на случай если кто-то уже был активен)
                    showFunc(i); // и показываем только того, на кого кликнули.
                }
            });
        }
    });



    // Timer

    const deadline = '2022-10-27'; //  конечная дата



    function getTimeRemaining(endtime) { //функция по расчету промежутков

        let days, hours, minutes, seconds; // объявляем переменные здесь так как ниже будет условие
        const t = Date.parse(endtime) - Date.parse(new Date()); // создаем локальную переменную в которую методом Date.parse разбираем строковое значение и переводим его в милисекунды. от этих милисекунд отнимаем также переведенное в милисекунды ВРЕМЯ ДАТЫ ИЗ СИСТЕМЫ. получаем разницу которую и будет отщитывать таймер.

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor((t / (1000 * 60 * 60 * 24))); //  вычисляем дни. выводим разультат без остатся через math.floor. РАЗНИЦУ делим на произведение (тысяча милисекунд  умноженые на 60(так получаем количество милисекунд в одной минуте) умноженые ещё раз на 60(получаем сколько в одном часе) и умножаем еще раз на 24 часа(и получаем сколько в сутках будет милисекунд) ). арифметика в скобках - получение милисекунд в одних сутках.  разницу в милисекундах делим на милисекунды в одних сутках и получаем СКОЛЬКО СУТОК ОСТАЛОСЬ ДО ОКОНЧАНИЕ НАШЕЙ ДАТЫ.
            hours = Math.floor((t / (1000 * 60 * 60) % 24)); // (нашу разницу милисекунд делим на количество милисекунд в одном часе) делим это % на 24 и % возвращает нам остаток от деления. (пример%: 5 % 2 = 1.  5/2=4 и 1 в остатке)
            minutes = Math.floor((t / 1000 / 60) % 60); // (разницу делим на 1000 и получаем количество секунд которые у нас есть, потом делим на 60 и получаем количество минут) % 60 т.к. в одной минуте шестьдесят секунд. и получаем остаток деления минут. (примечание: он не должен быть больше чем 60).
            seconds = Math.floor((t / 1000) % 60); // (остаток делем на 100 и получаем колиество секунд внутри милисекунд) и % остаток от 60. 
        }

        return { //функция возвращает обьект в котором на основе расчетов получены отдельные данные.
            'total': t, // разница
            'days': days, // дни
            'hours': hours, //часы
            'minutes': minutes, //минуты
            'seconds': seconds //секунды
        };
    }

    function getZero(num) { // добавления нуля к числам до 10. если было 2 останет 02. было 6 станет 06. 10 и дальше не изменяется т.к. двухзначное. аргументом передается какое-то число.
        if (num >= 0 && num < 10) { // сработает если число больше или равно нули И меньше десяти.
            return `0${num}`; //возвращаем добавочный ноль и то число которое было передано в аргумент.
        } else { // если число больше 10
            return num; // просто возвращаем его и ничего не делаем т.к. не надо.
        }
    }


    function setClock(selector, endtime) { // функция установки таймера на страничке. принимает 2 аргумента.

        //элементы со страницы:
        const timer = document.querySelector(selector), // переменная таймер - получаем в нее таймер. если их на странице будет несколько, то их селектор передается сюда первым аргументом.
            days = timer.querySelector('#days'), // получаем айди #days обращаясь не к документу а сразу к таймеру
            hours = timer.querySelector('#hours'), // получаем айди #hours обращаясь не к документу а сразу к таймеру
            minutes = timer.querySelector('#minutes'), // получаем айди #minutes обращаясь не к документу а сразу к таймеру
            seconds = timer.querySelector('#seconds'), // получаем айди #seconds обращаясь не к документу а сразу к таймеру
            timeInterval = setInterval(updateClock, 1000); // устанавливаем, что с интервалом в секунду будем запускать функцию updateClock. имитация стрелки часов. тик-так :)

        updateClock(); // запускается тут, для того, что бы не было скачков и она начинала действовать с момента загрузки страницы.

        function updateClock() { // помещаем таймер на страницу. теперь об будет виден глазу.
            const t = getTimeRemaining(endtime); // в локальную переменную  засовываем "функция по расчету промежутков" написаную первой(которая вычисляет всё и переносит итоги в обьект). теперь в t хранится этот обьект с уже полученными данными.

            // закидываем всё это дело в верстку
            days.innerHTML = getZero(t.days);  // в полученный выше (days = timer.querySelector('#days')) #days закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.
            hours.innerHTML = getZero(t.hours);// в полученный выше (hours = timer.querySelector('#hours')) #hours закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.
            minutes.innerHTML = getZero(t.minutes);// в полученный выше (minutes = timer.querySelector('#minutes')) #minutes закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.
            seconds.innerHTML = getZero(t.seconds);// в полученный выше (seconds = timer.querySelector('#seconds')) #seconds закидывает значение из обьета, проверяя, надо ли подставлять ноль или нет.

            if (t.total <= 0) { // проверяем у обьекта созданного первой функцией getTimeRemaining() свойство total, и если оно равняется нулю, значит таймер истек, интервал останавливается и таймер больше не идет.
                clearInterval(timeInterval); // собственно сама отмена таймера.
            }

        }

    }


    setClock('.timer', deadline); // запускаем функцию установки времени для определенного таймера. передаем первым аргументом тот таймер на сайте на который нужно установить отсчет. а вторым аргументом сам дедлайн в формате строчки 


    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'), // кнопки которые будут триггерить наше модальное окно(открывает)
        modal = document.querySelector('.modal'); // получаем само модальное окно
    // modalCloseBtn = document.querySelector('[data-close]'); // кнопка закрытия окна

    function openModal() { // функция открытия модального окна
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('hide');
        document.body.style.overflow = 'hidden'; // запрещаем скроллить
        clearInterval(modalTimerId);
    }


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal); // показываем наше модальное окно
    }); // используем метод для перебора всех кнопок на странице  

    function closeModal() { // функция закрытия модального окна
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('hide');
        document.body.style.overflow = ''; // разрешаем скроллить
    }

    // modalCloseBtn.addEventListener('click', closeModal); // закрываем наше окно

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    }); // закрываем окно по нажатию на подложку и на кнопку

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hide')) {
            closeModal();
        }
    }); // будем закрывать наше окно по нажатию на клавишу esc

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() { // функция которая показывает окно при скролле до конца
        if (window.pageYOffset + this.document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        } // условие для вызова окна 
    }

    window.addEventListener('scroll', showModalByScroll); // если пользователь прокрутит сайт до конца, вызовется модальное окно

    // Ипользуем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; // записываем свойства
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // если будут добавлять не предвиденные класы то мы их добавим с помощью rest
            this.parent = document.querySelector(parentSelector); // получаем родителя(куда именно в верстку будет вставляться наша созданная верствка)
            this.transfer = 37;
            this.changeToUAH();
        } // получаем аргументы для конструктора

        changeToUAH() {
            this.price = this.price * this.transfer;
        }  // метод который будет заниматьтся конвертацией валют

        render() {
            const element = document.createElement('div'); // создаем элеемент, чтобы поместить его на страницу
            if (this.classes === 0) { // проверка что ничего не передано в рест(рест всегда возвращает пустой массив)
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = ` 
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">
                        ${this.descr}
                    </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `; // вставляем нашу верстку в наш элемент который будет вставляться на страницу
            this.parent.append(element); // добавляем наш элемент в родителя
        } // метод который будет рендерить верстку(формировать)
    } // создаем класс(шаблон) для карточек

    // const div = new MenuCard();
    // div.render();
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render(); // используем наш метод и объект на месте(на него не будет сссылок и он не будет сохраняться)

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();

    // Forms
    // Отправка данных на сервер
    const forms = document.querySelectorAll('form'); // получение всех форм

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    }; // объект с сообщениями после отправки

    forms.forEach(item => {
        postData(item);
    }); // под каждую форму подвязываем  нашу функцию postData

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отменяем перезагрузку страницы

            const statusMessage = document.createElement('img'); // создаем элемент(див) который будет добавляться к форме
            statusMessage.src = message.loading; // подставляем нужный атрибут
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;// добавляем стили
            // form.append(statusMessage); // добавляем наше сообщение к форме 
            form.insertAdjacentElement('afterend', statusMessage); // наш спиннер будет добавляться после элементов

            const formData = new FormData(form); //  FormData - это специальный объект который позволяет из определенной формы быстро сформировать все данные которые заполнил пользователь с форматом ключ-значение

            const object = {}; // создаем пустой объект куда будут помещаться наши данные 
            formData.forEach(function (value, key) {
                object[key] = value;
            }); // переберем все что есть внутри и поместим все эти данные в object

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
                .then(data => data.text())
                .then(data => {
                    console.log(data); // проверяем что все правильно произошло
                    showThanksModal(message.success); // исходя из проверки выводим другое сообщение
                    statusMessage.remove(); // удаляем наш блок со страницы 
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); // после успешной отправки очищаем нашу форму(input содержимое внутри него)
                });
        }); // Отслеживаем конечную загрузку
    } // функция которая отвечает за постинг данных 

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // получаем наш modal__dialog(в нем есть определенные которые необходимы для создания формы)

        prevModalDialog.classList.add('hide'); // скрываем элемент перед тем как показать модальное окно
        openModal(); // функция открытия модального окна

        const thanksModal = document.createElement('div'); // блок обертка
        thanksModal.classList.add('modal__dialog'); // назначаем класс 
        thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `; // формируем верстку

        document.querySelector('.modal').append(thanksModal); // помещаем наш блок
        setTimeout(() => {
            thanksModal.remove(); // удаляем нашу созданную форму
            prevModalDialog.classList.add('show'); // показываем наше предыдущее окно(с инпутами)
            prevModalDialog.classList.remove('hide'); // убираем класс скрытия 
            closeModal(); // закрываем наше окно чтобы не мешать пользователю
        }, 4000); // через определенное время все возвращается на свои места
    }

}); //техническая функция загрузки DOM