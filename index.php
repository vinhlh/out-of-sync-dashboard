<!DOCTYPE html>
<html>
<head>
    <title>Out of Sync Dashboard</title>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="bower_components/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="bower_components/angular-chart.js/dist/angular-chart.css">
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body ng-app="OutOfSync">
    <div class="container" ng-controller="MainController as vm">
        <div class="row">
            <div class="col-md-12">
                <h3><center><b>Out of Sync</b> Dashboard</center></h3>
            </div>
        </div>
        <center ng-show="!vm.results.series.length" ng-cloak>Empty data!</center>
        <div class="row">
            <div class="col-md-3">
                <table class="table table-striped" ng-show="vm.results.series.length" ng-cloak>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Stock</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="(country, data) in vm.results.overral">
                            <td>
                                <span class="label label-primary">
                                    <span class="flag-icon flag-icon-{{country.toLowerCase()}}"></span>
                                    {{country}}
                                </span>
                            </td>
                            <td class="data">
                                <div>{{data.stock | number}}</div>
                            </td>
                            <td class="data">
                                <div>{{data.status | number}}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-9">
                <canvas id="line" class="chart chart-line" data="vm.results.data" options="vm.options"
                  labels="vm.results.labels" legend="true" series="vm.results.series">
                </canvas>
            </div>
        </div>
    </div>
    <script src="bower_components/Chart.js/Chart.min.js"></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/angular-chart.js/dist/angular-chart.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>