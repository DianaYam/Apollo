
/* добавление обработчиков событий */

$(document).ready(function () {
    $('#navigation__button').click(function (e) {
        $(e.target).next().toggleClass('hidden');
    });

    $('.navlink, .exit-modal').click(function (e) {
        $(e.target).parent().parent().toggleClass('hidden');
    });

    $('#feedback-form').submit(function () {
        if (formValid()) {
            $('#order-modal').toggleClass('hidden');
            clearForm();
        }
    });
});


/* функции для формы */

function formValid() {
    var email = $('#feedback-email').val();
    var subject = $('#feedback-subject').val();
    var message = $('#feedback-message').val();

    var regex = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');

    return regex.test(email) && subject.length !== 0 && message.length !== 0;
}
function clearForm() {
    $('#feedback-email').val('');
    $('#feedback-subject').val('');
    $('#feedback-message').val('');
}


/* плавная прокрутка */

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.15;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
        e.preventDefault();

        var w = window.pageYOffset,  // производим прокрутку
            hash = this.href.replace(/[^#]*(.*)/, '$1'),  // к id элемента, к которому нужно перейти
            t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;

        requestAnimationFrame(step);

        function step(time) {
            if (start === null) start = time;

            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));

            window.scrollTo(0, r);

            if (r !== w + t) {
                requestAnimationFrame(step)
            }
            else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}