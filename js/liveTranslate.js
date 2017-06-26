/*
* Just Live Translate
* Author: Иван "ImFuryPro" Сапоненко
* Version: 1.1
* Description: Реализует живой перевод сайта по словарю
*/

$(function() {
    var source = './js/dictionaries/dictionary.json'; // Путь до словаря в формате JSON
    if ($.cookie('lang') == '') $.cookie('lang', 'ru'); // По умолчанию "Русский"

    /*
    * Получение словаря из JSON файла и его обработка
    * source - путь до словаря
    * lang - язык словаря
    */
    var setGetDictionary = function(source, lang) {
        var dict = [];

        $.getJSON(source, function(data) {
            dict.push(data[lang]);

            for (var word in dict[0]) {
                $('[word="'+ word +'"]').html(dict[0][word]);
            }
        });
    };
    setGetDictionary(source, $.cookie('lang'));
    
    /*
    * Переключение языка на лету
    * idButton - id ссылки или кнопки
    */
    var changeLanguage = function(idButton) {
        $("#" + idButton).click(function () {
            $.cookie('lang', idButton);
            setGetDictionary(source, idButton);
        });
    };
    $("#languages > a").each(function(index, element) {
        changeLanguage($(element).attr("id"));
    });
});