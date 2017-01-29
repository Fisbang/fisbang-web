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
      .when('/appliance/:applianceId', {
        templateUrl: 'views/appliance_detail.html',
        controller: 'ApplianceDetailCtrl',
        controllerAs: 'appliance_detail'
      })
      .when('/environments', {
        templateUrl: 'views/environments.html',
        controller: 'EnvironmentsCtrl',
        controllerAs: 'environments'
      })
      .when('/environment/:environmentId', {
        templateUrl: 'views/environment_detail.html',
        controller: 'EnvironmentDetailCtrl',
        controllerAs: 'environment_detail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
