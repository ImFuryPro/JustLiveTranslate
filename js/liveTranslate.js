/*
* Just Live Translate
* Author: Иван "ImFuryPro" Сапоненко
* Version: 1.2
* Description: Реализует живой перевод сайта по созданному словарю
*/

$(function() {
    var source = './js/dictionaries/dictionary.json'; // Путь до словаря в формате JSON
    if ($.cookie('lang') == '') $.cookie('lang', 'ru'); // По умолчанию "Русский"

    /*
    * Получение словаря из JSON файла и его обработка
    * source - путь до словаря
    * lang - язык словаря
    */
    setGetDictionary = function(source, lang) {
        $.getJSON(source, function(data) {
            for (var word in data[lang]) {
                var translateBlock = $('[word="'+ word +'"]');
                var dictWord = data[lang][word];

                if (translateBlock.prop('placeholder') != undefined) { translateBlock.prop('placeholder', dictWord); }
                else { translateBlock.html(dictWord); }
            }
        });
    };
    setGetDictionary(source, $.cookie('lang'));
    
    /*
    * Переключение языка на лету
    * idButton - id ссылки или кнопки
    */
    changeLanguage = function(idButton) {
        $("#" + idButton).click(function () {
            $.cookie('lang', idButton);
            setGetDictionary(source, idButton);
        });
    };
    $("#languages > a").each(function(index, element) {
        changeLanguage($(element).attr("id"));
    });
});
