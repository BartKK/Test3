'use strict';
//http://api.openweathermap.org/data/2.5/forecast/daily?q=Gdansk&cnt=2&appid=1e60284c59368f64086bca6970e8375a
var weatherApp = angular.module('weatherApp', [
    'ngRoute',
    'ngResource'

]);


// CONFIG
weatherApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: '/views/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: '/views/forecast.html',
            controller: 'forecastController'
        })
}]);

// SERVICE
weatherApp.service('cityService', function() {
    this.city = 'Gdansk';
});
// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService',

    function($scope, cityService) {
        $scope.city = cityService.city;

        $scope.$watch('city', function() {
            cityService.city = $scope.city;
        })
    }
]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
    function($scope, $resource, $routeParams, cityService) {
        $scope.city = cityService.city;
        $scope.days = $routeParams.days || 2;

        var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
        $scope.weatherResult = weatherApi.get({
            q: 'Gdansk',
            cnt: $scope.days,
            appid: '1e60284c59368f64086bca6970e8375a'
        }, function(res) {
            console.log(res);
            return res;

        });

        //     .$promise.then(function (data) {
        // console.log(data)
        //       return data;
        //     }).catch(function (err) {
        //       console.log(err)
        //     });


        $scope.city = cityService.city;

        $scope.convertToCelsius = function(data) {
            if (data < (0)) {
                return 'below absolute zero (0 K)';
            } else {
                return (data - 273.15).toFixed(1) + ('°C');
            }
        };

        $scope.angularDate = function(data) {
            return (data * 1000);
        };

    }
]);
