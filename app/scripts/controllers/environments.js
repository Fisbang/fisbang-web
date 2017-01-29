'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:EnvironmentsCtrl
 * @description
 * # MainCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('EnvironmentsCtrl', ['$scope','$log', '$http', '$location', function ($scope, $log, $http, $location) {
        $scope.environments = [];
        var lookup = {};
        
        $http.get('http://localhost:8081/environments').then(
            function(response){
                $log.log(response.data[0]);
                for(var i=0; i< response.data.length; i++){
                    $log.log(response.data[i]);
                    // var environment = {
                    //     id: response.data[i].id,
                    //     parentId: response.data[i].parentId
                    //     name: response.data[i].name
                    // }
                    var environment = response.data[i]
                    $log.log($scope.environments);
                    $scope.environments[i] = environment;
                };
                for (var i = 0, len = $scope.environments.length; i < len; i++) {
                    lookup[$scope.environments[i].id] = $scope.environments[i];
                }
                
                for (var i=0; i < $scope.environments.length; i++){
                    if ($scope.environments[i].parentId) {
                        $scope.environments[i].parent = lookup[$scope.environments[i].parentId];
                    }
                }
                $log.log("Environments =" + $scope.environments);
            },
            function(error){
                $log.log("error");
            });

        $scope.createEnvironment = function() {
            $log.log("Create environment");
            if ($scope.environmentName) {
                
                var newEnvironment = {
                    userId: 1,
                    name: $scope.environmentName
                }
                if ($scope.environmentParentId) {
                    newEnvironment.parentId = parseInt($scope.environmentParentId)
                }
                $http.post('http://localhost:8081/environments', newEnvironment).then(
                    function(response){
                        $log.log("environment created");
                        newEnvironment.id = response.data
                        if (newEnvironment.parentId) {
                            newEnvironment.parent = lookup[newEnvironment.parentId];
                        }
                        $log.log(newEnvironment)
                        $scope.environments.push(newEnvironment);
                    },
                    function(error){
                        $log.log("error create environment");
                    }
                );
                $log.log($scope.environments);
                $scope.environmentParentId = null;
                $scope.environmentName = '';
            };
        }

        $scope.toDetail = function(environmentId) {
            $log.log(environmentId);
            var new_location = '/environment/' + environmentId;
            $location.path(new_location);
        }

    }]);
