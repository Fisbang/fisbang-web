'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:AppliancesCtrl
 * @description
 * # MainCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('AppliancesCtrl', ['$scope','$log', '$http', '$location', function ($scope, $log, $http, $location) {
        $scope.appliances = [];
        $scope.environments = [];
        var lookup = {};

        $http.get('http://localhost:8081/environments').then(
            function(response){
                $log.log(response.data[0]);
                for(var i=0; i< response.data.length; i++){
                    $log.log(response.data[i]);
                    var environment = response.data[i]
                    $log.log($scope.environments);
                    $scope.environments[i] = environment;
                };
                for (var i = 0, len = $scope.environments.length; i < len; i++) {
                    lookup[$scope.environments[i].id] = $scope.environments[i];
                }
                $log.log("Environments =" + $scope.environments);

                $http.get('http://localhost:8081/appliances').then(
                    function(response){
                        for(var i=0; i< response.data.length; i++){
                            $log.log(response.data[i]);
                            // var appliance = {
                            //         id: response.data[i].id,
                            //         name: response.data[i].name
                            // }
                            var appliance = response.data[i];
                            appliance.environment = lookup[appliance.environmentId];
                            $log.log($scope.appliances);
                            $scope.appliances[i] = appliance;
                        };
                        $log.log("Appliances =" + $scope.appliances);
                    },
                    function(error){
                        $log.log("error");
                    });                
            },
            function(error){
                $log.log("error");
            });


        $scope.createAppliance = function() {
            $log.log("Create appliance");
            if ($scope.applianceName && $scope.applianceEnvironmentId) {
                
                var newAppliance = {
                    userId: 1,
                    name: $scope.applianceName,
                    environmentId: parseInt($scope.applianceEnvironmentId)
                }
                $http.post('http://localhost:8081/appliances', newAppliance).then(
                    function(response){
                        $log.log("appliances created");
                        newAppliance.id = response.data
                        newAppliance.environment = lookup[newAppliance.environmentId];
                        $log.log(newAppliance)
                        $scope.appliances.push(newAppliance);
                    },
                    function(error){
                        $log.log("error create appliances");
                    }
                );
                $log.log($scope.appliances);
                $scope.applianceName = '';
            };
        }

        $scope.toDetail = function(applianceId) {
            var new_location = '/appliance/' + applianceId;
            $location.path(new_location);
        }

        $scope.toEnvironmentDetail = function(environmentId) {
            var new_location = '/environment/' + environmentId;
            $location.path(new_location);
        }

    }]);
