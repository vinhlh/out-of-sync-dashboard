angular
.module('OutOfSync', ['chart.js'])
.controller('MainController', ['$interval', '$http', function ($interval, $http) {
    var vm = this;

    vm.options = {
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
