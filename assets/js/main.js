angular
.module('OutOfSync', ['chart.js'])
.controller('MainController', ['$interval', '$http', function ($interval, $http) {
    var vm = this;

    vm.options = {
        // scaleShowGridLines: false,
        // scaleShowHorizontalLines: false,
        // scaleShowVerticalLines: false,
        // pointDot: false
        bezierCurve: false
    };

    init();

    function init() {
        updateData();
        $interval(updateData, 1000);
    }

    function updateData() {
        $http.get('api.php').success(function (results) {
            vm.results = results;
        });
    }

}]);

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

    // utils function
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
            var data, countryHTML, stockHTML, statusHTML, ctx, chart, options;

            options = {

            };

            _elTableContent.html('');
            for (var country in resp) {
                data = resp[country][0];
                stockHTML = '<td class="data ' + (data['stock'] > 0 ? 'red' : 'green') + '">' + _numberFormat(data['stock']) + '<canvas id="chart-' + country + '-stock" width="200" height="60"></canvas></td>';
                statusHTML = '<td class="data ' + (data['status'] > 0 ? 'red' : 'green') + '">' + _numberFormat(data['status']) + '<canvas id="chart-' + country + '-status" width="200" height="60"></canvas></td>';

                countryHTML = '<td><span class="label label-primary"><span class="flag-icon flag-icon-' + country.toLowerCase() + '"></span> ' + country + '</span></td>';
                _elTableContent.append('<tr>' + countryHTML + stockHTML + statusHTML + '</tr>');

                ctx = document.getElementById('chart-' + country + '-stock').getContext("2d");
                console.log(ctx);
                chart = new Chart(ctx).Line(data, options);
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
    // OutOfSync.init();
});