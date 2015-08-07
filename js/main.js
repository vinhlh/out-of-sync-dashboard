var OutOfSync = (function ($) {
    var INTERVAL_UPDATE_TIME = 1800000, // 60 mins
        API_URL = null,
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
            for (var country in resp) {
                data = resp[country];
                _elTableContent.append('<tr><td>' + country + '</td><td>' +  data[0] + '</td><td>' + data[1] + '</td></tr>')
            }

            _elLoading.addClass('hidden');
            _elUpdateInfo.removeClass('hidden');
            _elUpdateInfo.find('b').html(new Date());
        });
    },
    _loadData = function(callback) {
        var resp = localStorage.getItem(OUT_OF_SYNC_STORAGE_KEY);

        resp = JSON.parse(resp);
        console.log(resp);
        if (resp != null) {
            if ((+new Date()) - resp.t < INTERVAL_UPDATE_TIME - 60000) { // 1 min
                callback(resp.data);
                return false;
            } else {
                localStorage.setItem(OUT_OF_SYNC_STORAGE_KEY, null);
            }
        }

        console.log('call api');
        if (!API_URL) { // for test
            window.setTimeout(function () {
                var resp = {
                    'VN': [100, 20],
                    'SG': [6, 11],
                    'TH': [4, 4]
                };
                localStorage.setItem(OUT_OF_SYNC_STORAGE_KEY, JSON.stringify({t: +new Date(), data:resp}))
                callback(resp);
            }, 1000);
        } else { // production
            $.get(API_URL, function (resp) {
                localStorage.setItem(OUT_OF_SYNC_STORAGE_KEY, JSON.stringify({t: +new Date(), data:resp}))
                callback(resp);
            });
        }
    };

    return {
        init: _init
    }
})(jQuery);

$(document).on('ready', function () {
    OutOfSync.init();
});