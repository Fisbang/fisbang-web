'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:DeviceDetailCtrl
 * @description
 * # DeviceDetailCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('DeviceDetailCtrl', ['$scope', '$routeParams','$log', '$http', '$location', function ($scope, $routeParams, $log, $http, $location) {
        var deviceId = $routeParams.deviceId;

        $http.get('http://localhost:8081/devices/'+deviceId).then(
            function(response){
                $scope.device = response.data;
                $scope.device.id = deviceId;
            },
            function(error){
                $log.log("error");
            });

        $scope.deleteDevice = function() {
            $log.log("Delete device" + $scope.device.id);
            if ($scope.device) {
                
                $http.delete('http://localhost:8081/devices/'+$scope.device.id).then(
                    function(response){
                        $log.log("device deleted");
                        $scope.toDeviceList();
                    },
                    function(error){
                        $log.log("error delete device");
                    }
                );
            };
        }

        $scope.updateDevice = function() {
            $log.log("Update device" + $scope.device.id);
            if ($scope.device) {
                $http.put('http://localhost:8081/devices/'+$scope.device.id, $scope.device).then(
                    function(response){
                        $log.log("device update");
                    },
                    function(error){
                        $log.log("error updating device");
                    }
                );
            };
        }

        $scope.toDeviceList = function() {
            $location.path('devices');            
        }

    }]);
