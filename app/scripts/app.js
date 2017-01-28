'use strict';

/**
 * @ngdoc overview
 * @name fisbangWebApp
 * @description
 * # fisbangWebApp
 *
 * Main module of the application.
 */
angular
  .module('fisbangWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-flot',
    'angularBasicAuth'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/appliances', {
        templateUrl: 'views/appliances.html',
        controller: 'AppliancesCtrl',
        controllerAs: 'appliances'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
