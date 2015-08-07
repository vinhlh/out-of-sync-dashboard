var OutOfSync = (function ($) {
    var API_URL = 'json.php',
        OUT_OF_SYNC_STORAGE_KEY = 'zalora_out_of_sync',
        _elTableContent = $('table tbody'),
        _elLoading = $('.loading'),
        _elUpdateInfo = $('.update-info');

    var _init = function() {
        _updateData();
        var t = window.setInterval(function() {
            _updateData();
        }, INTERVAL_UPDATE_TIME);
    },
    _updateData = function() {
        _elLoading.removeClass('hidden');
        _elUpdateInfo.addClass('hidden');

        _loadData(function (resp) {
            var data;

            _elTableContent.html('');
            for (var country in resp.data) {
                data = resp.data[country];
                _elTableContent.append('<tr><td>' + country + '</td><td>' +  data[0] + '</td><td>' + data[1] + '</td></tr>')
            }

            _elLoading.addClass('hidden');
            _elUpdateInfo.removeClass('hidden');
            _elUpdateInfo.find('b').html(new Date(resp.t * 1000) + ' [' + resp.cache + ']');
        });
    },
    _loadData = function(callback) {
        $.get(API_URL + '?t=' + (+ new Date()), function (resp) {
            callback(resp);
        });

        if (!API_URL) { // for test
            window.setTimeout(function () {
                var resp = {
                    'VN': [100, 20],
                    'SG': [6, 11],
                    'TH': [4, 4]
                };
                callback(resp);
            }, 1000);
        } else { // production
        }
    };

    return {
        init: _init
    }
})(jQuery);

$(document).on('ready', function () {
    OutOfSync.init();
});