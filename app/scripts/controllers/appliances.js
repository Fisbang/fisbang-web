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
        
        $http.get('http://localhost:8081/appliances').then(
            function(response){
                for(var i=0; i< response.data.length; i++){
                    $log.log(response.data[i]);
                    var appliance = {
                            id: response.data[i].id,
                            name: response.data[i].name
                    }
                    $log.log($scope.appliances);
                    $scope.appliances[i] = appliance;
                };
                $log.log("Appliances =" + $scope.appliances);
            },
            function(error){
                $log.log("error");
            });

        $scope.createAppliance = function() {
            $log.log("Create appliance");
            if ($scope.applianceName) {
                
                var newAppliance = {
                    userId: 1,
                    name: $scope.applianceName
                }
                $http.post('http://localhost:8081/appliances', newAppliance).then(
                    function(response){
                        $log.log("appliances created");
                        newAppliance.id = response.data
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
    }]);
