'use strict';

var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngRoute', 'ngCookies', 'ngMessages'])
    .config(config)
    .run(run);

app.config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'userCtrl'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'userCtrl'
        })
        .when('/products', {
            templateUrl: 'templates/products.html',
            controller: 'productsCtrl'
        })
        .otherwise({ redirectTo: '/register' });
}

app.run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$sessionService'];

function run($rootScope, $location, $cookies, $http, sessionService) {
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;

        if (restrictedPage && !sessionService.get('user')) {
            $location.path('/login');
            event.preventDefault();
        }
    });
};