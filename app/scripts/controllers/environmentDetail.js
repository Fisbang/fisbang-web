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

                $http.get('http://localhost:8081/environments/'+environmentId+'/devices').then(
                        function(response){
                            $scope.environment.devices = response.data
                            $log.log("Got Devices:" + $scope.environment.devices);
                        },
                        function(error){
                            $log.log("error");
                        });

                $log.log("Environment =" + $scope.environment);
            },
            function(error){
                $log.log("error");
            });

        $scope.devices = [];
        $scope.available_devices = [];
        $http.get('http://localhost:8081/devices').then(
            function(response){
                for(var i=0; i< response.data.length; i++){
                    $log.log(response.data[i]);
                    var device = response.data[i];
                    $log.log($scope.devices);
                    $scope.devices[i] = device;
                    if (device.environmentId == null && device.applianceId == null) {
                        $scope.available_devices.push(device);
                    }
                };
                $log.log("Devices =" + $scope.devices);
            },
            function(error){
                $log.log("error");
            });                

        $scope.addDevice = function() {
            $log.log("Add device to environment" + $scope.environment.id);
            if ($scope.newDevice) {
                var newDeviceId = $scope.newDevice.id;
                $http.post('http://localhost:8081/environments/'+$scope.environment.id+'/devices', $scope.newDevice).then(
                    function(response){
                        $log.log("device added");
                        $scope.environment.devices = response.data;
                        for(var i = $scope.available_devices.length - 1; i >= 0; i--) {
                            if($scope.available_devices[i].id === newDeviceId) {
                                $scope.available_devices.splice(i, 1);
                            }
                            $log.log($scope.available_devices);
                        }
                    },
                    function(error){
                        $log.log("error add device");
                    }
                );
            };


            $scope.newDevice = null;
        }

        $scope.removeDevice = function(device) {
            $log.log("Remove device from environment" + $scope.environment.id);
            $log.log("device : " + device.id);
            if (device.id) {
                
                $http.delete('http://localhost:8081/environments/'+$scope.environment.id+'/devices/' + device.id).then(
                    function(response){
                        $log.log("device removed");
                        $scope.environment.devices = response.data;
                        $scope.available_devices.push(device);
                    },
                    function(error){
                        $log.log("error remove device");
                    }
                );
            };
                
        }

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
        
        $scope.updateEnvironment = function() {
            $log.log("Update environment" + $scope.environment.id);
            if ($scope.environment) {
                $scope.environment.parentId = $scope.environment.parent.id;
                $http.put('http://localhost:8081/environments/'+$scope.environment.id, $scope.environment).then(
                    function(response){
                        $log.log("environments update");
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
