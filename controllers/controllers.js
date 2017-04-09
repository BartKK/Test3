
//CONTROLLERS
angular.module('weatherApp').controller('homeController', ['$scope', 'cityService',

    function($scope, cityService) {
        $scope.city = cityService.city;

        $scope.$watch('city', function() {
            cityService.city = $scope.city;
        })
    }
]);

angular.module('weatherApp').controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
    function($scope, $resource, $routeParams, cityService) {
        $scope.city = cityService.city;
        $scope.days = $routeParams.days || 2;

        var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
        $scope.weatherResult = weatherApi.get({
            q: $scope.city,
            cnt: $scope.days,
            appid: '1e60284c59368f64086bca6970e8375a'
        }, function(res) {
            console.log(res);
            return res;

        });

        $scope.city = cityService.city;

        $scope.convertToCelsius = function(data) {
            if (data < (0)) {
                return 'below absolute zero (0 K)';
            } else {
                return (data - 273.15).toFixed(1) + ('°C');
            }
        };

        $scope.formatedDate = function(data) {
            return (data * 1000);
        };

    }
]);
