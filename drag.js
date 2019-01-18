
// dragstart - вызывается в самом начале переноса перетаскиваемого элемента.
// dragend - вызывается в конце события перетаскивания - как успешного, так и отмененного.
// dragenter - происходит в момент когда перетаскиваемый объект попадает в область целевого элемента.
// dragleave - происходит когда перетаскиваемый элемент покидает область целевого элемента.
// dragover - происходит когда перетаскиваемый элемент находиться над целевым элементом.
// drop - вызывается, когда событие перетаскивания завершается отпусканием элемента над целевым элементом.

window.onload = function () {
    var i;
    var shirt = document.getElementById("shirt");
    var pants = document.getElementById("pants");
    var boots = document.getElementById("boots");
    var price = document.getElementsByTagName("span")[0];
    var target = document.getElementById("target");
    price.innerHTML = 0;
    var arr = [];
    var data;
    arr.push(shirt, pants, boots);
    for (i = 0; i < arr.length; i++) {

        // начало операции drag
        arr[i].addEventListener('dragstart', function (evt) {
            // меняем стиль в начале операции drag & drop
            this.style.border = "4px solid orange";
            // Свойство DataTransfer – место, где реализуется перетаскивание. Оно содержит часть данных,
            // отправляемых при выполнении этого действия. Объект dataTransfer устанавливается в событии dragstart,
            // а считывается и обрабатывается в событии drop. 
            // Свойство effectAllowed управляет визуальным эффектом (чаще всего это вид указателя мыши),
            // который браузер создает в ответ 
            // на тип происходящего  события перетаскивания (перемещение, копирование и т. п.).

            evt.dataTransfer.effectAllowed = "move";

            // Метод setData(...) сообщает механизму перетаскивания в браузере, какие данные из перетаскиваемого объекта должен «поймать»
            // целевой элемент, также называемый зоной приема. Здесь мы указываем, что передаваемые данные это id элемента
            evt.dataTransfer.setData("Text", this.id);
        }, false);

        // конец операции drag
        arr[i].addEventListener("dragend", function (evt) {
            this.style.border = "1px solid green";

            // удаляем стили добавленные в начале операции drag & drop 
        }, false);

    }



    // перетаскиваемый объект попадает в область целевого элемента
    target.addEventListener("dragenter", function (evt) {
        this.style.backgroundColor = "green";
    }, false);

    // перетаскиваемый элемент покидает область целевого элемента
    target.addEventListener("dragleave", function (evt) {
        this.style.backgroundColor = "blue";
    }, false);

    target.addEventListener("dragover", function (evt) {

        // отменяем стандартное обработчик события dragover.
        // реализация данного обработчика по умолчанию не позволяет перетаскивать
        // данные на целевой элемент, так как большая
        // часть веб страницы не может принимать данные.
        // Для того что бы элемент мог принять перетаскиваемые
        // данные необходимо отменить стандартный обработчик.
        if (evt.preventDefault) evt.preventDefault();
        return false;
    }, false);

    // перетаскиваемый элемент отпущен над целевым элементом
    target.addEventListener("drop", function (evt) {

        // прекращаем дальнейшее распространение события по дереву DOM и отменяем возможный стандартный обработчик установленный браузером.
        if (evt.preventDefault) evt.preventDefault();
        if (evt.stopPropagation) evt.stopPropagation();

        this.style.border = "";
        var id = evt.dataTransfer.getData("Text"); // получаем информации которая передавалась через операцию drag & drop 
        var elem = document.getElementById(id);
        // добавляем элемент в целевой элемент. Так как в DOM не может быть два идентичных элемента - элемент удаляется со своей старой позиции.

        this.appendChild(elem);
        price.innerHTML = +(price.innerHTML) + +(elem.getAttribute("data-price"));
        return false;
    }, false);


}
