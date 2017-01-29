'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:ApplianceDetailCtrl
 * @description
 * # ApplianceDetailCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('ApplianceDetailCtrl', ['$scope', '$routeParams','$log', '$http', '$location', function ($scope, $routeParams, $log, $http, $location) {
        var applianceId = $routeParams.applianceId;

        $scope.environments = [];
        $http.get('http://localhost:8081/environments').then(
            function(response){
                $log.log(response.data[0]);
                for(var i=0; i< response.data.length; i++){
                    $log.log(response.data[i]);
                    var environment = response.data[i]
                    $log.log($scope.environments);
                    $scope.environments[i] = environment;
                };
                $log.log("Environments =" + $scope.environments);
            },
            function(error){
                $log.log("error");
            });
        
        $http.get('http://localhost:8081/appliances/'+applianceId).then(
            function(response){
                $scope.appliance = response.data;
                $scope.appliance.id = applianceId;
                $http.get('http://localhost:8081/environments/'+$scope.appliance.environmentId).then(
                    function(response){
                        $scope.appliance.environment = response.data;
                        $scope.appliance.environment.id = $scope.appliance.environmentId;
                        $log.log("Appliance =" + $scope.appliance);
                    },
                    function(error){
                        $log.log("error");
                    });

                $http.get('http://localhost:8081/appliances/'+applianceId+'/devices').then(
                        function(response){
                            $scope.appliance.devices = response.data
                            $log.log("Got Devices:" + $scope.appliance.devices);
                        },
                        function(error){
                            $log.log("error");
                        });
                
            },
            function(error){
                $log.log("error");
            });

        $scope.deleteAppliance = function() {
            $log.log("Delete appliance" + $scope.appliance.id);
            if ($scope.appliance) {
                
                $http.delete('http://localhost:8081/appliances/'+$scope.appliance.id).then(
                    function(response){
                        $log.log("appliances deleted");
                        $scope.toApplianceList();
                    },
                    function(error){
                        $log.log("error delete appliance");
                    }
                );
            };
        }

        $scope.updateAppliance = function() {
            $log.log("Update appliance" + $scope.appliance.id);
            if ($scope.appliance) {
                $scope.appliance.environmentId = $scope.appliance.environment.id;
                $http.put('http://localhost:8081/appliances/'+$scope.appliance.id, $scope.appliance).then(
                    function(response){
                        $log.log("appliance update");
                    },
                    function(error){
                        $log.log("error updating appliance");
                    }
                );
            };
        }

        $scope.toApplianceList = function() {
            $location.path('appliances');            
        }

        $scope.toEnvironmentDetail = function(environmentId) {
            var new_location = '/environment/' + environmentId;
            $location.path(new_location);
        }

    }]);
