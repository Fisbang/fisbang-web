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

        $http.get('http://localhost:8081/appliances/'+applianceId).then(
            function(response){
                $scope.appliance = response.data;
                $scope.appliance.id = applianceId;
                $log.log("Appliance =" + $scope.appliance);
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

        $scope.toApplianceList = function() {
            $location.path('appliances');            
        }
    }]);
