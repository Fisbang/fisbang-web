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
            $log.log("Add device to appliance" + $scope.appliance.id);
            if ($scope.newDevice) {
                var newDeviceId = $scope.newDevice.id;
                $http.post('http://localhost:8081/appliances/'+$scope.appliance.id+'/devices', $scope.newDevice).then(
                    function(response){
                        $log.log("device added");
                        $scope.appliance.devices = response.data;
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
            $log.log("Remove device from appliance" + $scope.appliance.id);
            $log.log("device : " + device.id);
            if (device.id) {
                
                $http.delete('http://localhost:8081/appliances/'+$scope.appliance.id+'/devices/' + device.id).then(
                    function(response){
                        $log.log("device removed");
                        $scope.appliance.devices = response.data;
                        $scope.available_devices.push(device);
                    },
                    function(error){
                        $log.log("error remove device");
                    }
                );
            };
                
        }

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
