'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:EnvironmentDetailCtrl
 * @description
 * # EnvironmentDetailCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('EnvironmentDetailCtrl', ['$scope', '$routeParams','$log', '$http', '$location', function ($scope, $routeParams, $log, $http, $location) {
        var environmentId = $routeParams.environmentId;

        $http.get('http://localhost:8081/environments/'+environmentId).then(
            function(response){
                $scope.environment = response.data;
                $scope.environment.id = environmentId;
                if ($scope.environment.parentId) {
                    var parentId = $scope.environment.parentId;
                    $log.log("Getting parent");
                    $http.get('http://localhost:8081/environments/'+parentId).then(
                        function(response){
                            $scope.environment.parent = response.data;
                            $scope.environment.parent.id = parentId;
                            $log.log("Got parent:" + $scope.environment.parent.name);
                        },
                        function(error){
                            $log.log("error");
                        });
                }

                $http.get('http://localhost:8081/environments/'+environmentId+'/appliances').then(
                        function(response){
                            $scope.environment.appliances = response.data
                            $log.log("Got Appliances:" + $scope.environment.appliances);
                        },
                        function(error){
                            $log.log("error");
                        });
                
                $log.log("Environment =" + $scope.environment);
            },
            function(error){
                $log.log("error");
            });

        $scope.deleteEnvironment = function() {
            $log.log("Delete environment" + $scope.environment.id);
            if ($scope.environment) {
                
                $http.delete('http://localhost:8081/environments/'+$scope.environment.id).then(
                    function(response){
                        $log.log("environments deleted");
                        $scope.toEnvironmentList();
                    },
                    function(error){
                        $log.log("error delete environment");
                    }
                );
            };
        }

        $scope.toDetail = function(environmentId) {
            $log.log(environmentId);
            var new_location = '/environment/' + environmentId;
            $location.path(new_location);
        }

        $scope.toApplianceDetail = function(applianceId) {
            $log.log(applianceId);
            var new_location = '/appliance/' + applianceId;
            $location.path(new_location);
        }

        $scope.toEnvironmentList = function() {
            $location.path('environments');            
        }
    }]);
