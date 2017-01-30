'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:DevicesCtrl
 * @description
 * # MainCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('DevicesCtrl', ['$scope','$log', '$http', '$location', function ($scope, $log, $http, $location) {
        $scope.devices = [];

        $http.get('http://localhost:8081/devices').then(
            function(response){
                for(var i=0; i< response.data.length; i++){
                    $log.log(response.data[i]);
                    var device = response.data[i];
                    $log.log($scope.devices);
                    $scope.devices[i] = device;
                };
                $log.log("Devices =" + $scope.devices);
            },
            function(error){
                $log.log("error");
            });                

        $scope.createDevice = function() {
            $log.log("Create device");
            if ($scope.deviceToken) {
                
                var newDevice = {
                    userId: 1,
                    token: $scope.deviceToken,
                }
                $http.post('http://localhost:8081/devices', newDevice).then(
                    function(response){
                        $log.log("device created");
                        newDevice.id = response.data
                        $log.log(newDevice)
                        $scope.devices.push(newDevice);
                    },
                    function(error){
                        $log.log("error create device");
                    }
                );
                $log.log($scope.devices);
                $scope.deviceToken = '';
            };
        }

        $scope.toDetail = function(deviceId) {
            var new_location = '/device/' + deviceId;
            $location.path(new_location);
        }

    }]);
