(function () {
    var openDisclosure = angular.module('openDisclosure', ['ngRoute']);

    openDisclosure.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl',
                controllerAs: 'homeCtrl'
            })
            .when('/candidate/:candidate', {
                templateUrl: 'partials/candidate-profile.html',
                controller: 'candidateProfileCtrl',
                controllerAs: 'candidateProfileCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    openDisclosure.controller('homeCtrl', function ($scope, $http, $rootScope, $location) {

        var input;
        $.ajax({
            url: 'data/results.csv',
            type: 'get',
            async: false,
            success: function (data) {
                input = data;
            },
            error: function (err) {
                console.log(err);
            }
        });

        $scope.candidates = $.csv.toObjects(input);

        $scope.totals = {
            contributions: 0,
            expenditures: 0,
            count: 0
        };

        for (var i in $scope.candidates) {
            $scope.totals.contributions += parseInt($scope.candidates[i].contributions);
            $scope.totals.expenditures += parseInt($scope.candidates[i].expenditures);
            $scope.totals.count += parseInt($scope.candidates[i].count);
        }
    });
    //$routeParams.blazerId;

    openDisclosure.controller('candidateProfileCtrl', function ($scope, $routeParams, $http, $rootScope, $location) {
        
        $scope.candidate = $routeParams.candidate;
    });

})();