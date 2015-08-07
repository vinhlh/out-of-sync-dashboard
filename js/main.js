var OutOfSync = (function ($) {
    var INTERVAL_UPDATE_TIME = 60000,
        API_URL = 'api.php',

        _elTableContent = $('table tbody'),
        _elLoading = $('.loading'),
        _elUpdateInfo = $('.update-info');

    var _init = function() {
        _updateData();
        var t = window.setInterval(function() {
            _updateData();
        }, INTERVAL_UPDATE_TIME);
    },
    _numberFormat =  function(number, decimals, decPoint, thousandsSep) {
        decimals = decimals || 0;
        number = parseFloat(number);

        if(!decPoint || !thousandsSep){
            decPoint = '.';
            thousandsSep = ',';
        }

        var roundedNumber = Math.round( Math.abs( number ) * ('1e' + decimals) ) + '';
        var numbersString = decimals ? roundedNumber.slice(0, decimals * -1) : roundedNumber;
        var decimalsString = decimals ? roundedNumber.slice(decimals * -1) : '';
        var formattedNumber = "";

        while (numbersString.length > 3) {
            formattedNumber += thousandsSep + numbersString.slice(-3)
            numbersString = numbersString.slice(0,-3);
        }

        return (number < 0 ? '-' : '') + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : '');
    },
    _updateData = function() {
        _elLoading.removeClass('hidden');
        _elUpdateInfo.addClass('hidden');

        _loadData(function (resp) {
            var data;

            _elTableContent.html('');
            for (var country in resp.data) {
                data = resp.data[country];
                data[0] = '<font color="' + (data[0] > 0 ? 'red' : 'green') + '">' + _numberFormat(data[0]) + '</font>';
                data[1] = '<font color="' + (data[1] > 0 ? 'red' : 'green') + '">' + _numberFormat(data[1]) + '</font>';

                _elTableContent.append('<tr><td>' + country  + ' <span class="flag-icon flag-icon-' + country.toLowerCase() + '"></span></td><td class="data">' +  data[0] + '</td><td class="data">' + data[1] + '</td></tr>')
            }

            _elLoading.addClass('hidden');
            _elUpdateInfo.removeClass('hidden');
            _elUpdateInfo.find('span').html(new Date(resp.t * 1000) + ' [' + resp.cache + ']');
        });
    },
    _loadData = function(callback) {
        $.get(API_URL + '?t=' + (+ new Date()), function (resp) {
            callback(resp);
        });
    };

    return {
        init: _init
    }
})(jQuery);

$(document).on('ready', function () {
    OutOfSync.init();
});