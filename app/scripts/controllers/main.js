'use strict';

/**
 * @ngdoc function
 * @name fisbangWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fisbangWebApp
 */
angular.module('fisbangWebApp')
    .controller('MainCtrl', ['$scope','$log', '$http', 'authDefaults', 'authService', function ($scope, $log, $http, authDefaults, authService) {
        $scope.user = {
            name: "John Doe"
        };
        
        $scope.currentEnergy = 4257;
        $scope.currentBalance = 32153;
        $scope.mainPower = {
            status: "CONNECTED"
        };
        $scope.todayHour = 8;
        $scope.todayDay = 9;
        $scope.todayEnergy = 123;
        $scope.todayBalance = 12345;
        $scope.monthlyEnergy = 4257;

        $scope.energyPercentage = 80;
        $scope.balancePercentage = 80;

        $scope.devices = [];

        $scope.mainEnergyData = [{ data: [[0, 5], [1, 8], [2, 5], [3, 8], [4, 7], [5,9], [6, 8], [7, 8], [8, 10], [9, 12], [10, 10]], label: 'Energy' }];
        $scope.mainEnergyOptions = {
                    series: {
                        lines: {
                            show: true, 
                            fill: true,
                            fillColor: 'rgba(121,206,167,0.2)'
                        },
                        points: {
                            show: true,
                            radius: '4.5'
                        }
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        autoHighlight: true
                    },
                   colors: ["#37b494"],
        };

        $scope.mainEnergyHover = function (event, pos, item) {
		var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
		$("#hoverdata").text(str);
	
		if (item) {
			var x = item.datapoint[0],
				y = item.datapoint[1];
			
				$("#tooltip").html("Energy : " + y)
				.css({top: item.pageY+5, left: item.pageX+5})
				.fadeIn(200);
		} else {
			$("#tooltip").hide();
		}
	}

        $scope.mainEnergyClick = function (event, pos, item) {
	    if (item) {
			$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
			//highlight(item.series, item.datapoint);
		}
	}

        var username = "demo@fisbang.com",
            password = "fisbang";

        authDefaults.authenticateUrl = 'http://app.fisbang.com/api/auth_token';

        authService.addEndpoint();
        authService.addEndpoint('http://app.fisbang.com');
        authService
            .login(username, password)
            .success(function(response) {
                $log.log("logged in");

                $http.get('http://app.fisbang.com/api/device').success(function(response){
                    $log.log(response);
                    var device = {};
                    for(var i=0; i< response.length; i++){
                        device = {
                            id: response[i].id,
                            name: response[i].device_type + ' ' + response[i].merk + ' ' + response[i].type,
                            status: response[i].connected,
                            sensors: response[i].sensors,
                            todayEnergy: 0,
                            monthlyEnergy: 0,
                            Options: {
                                series: {
                                    lines: {
                                        show: true, 
                                        fill: true,
                                        fillColor: 'rgba(121,206,167,0.2)'
                                    },
                                    points: {
                                        show: true,
                                        radius: '4.5'
                                    }
                                },
                                grid: {
                                    hoverable: true,
                                    clickable: true
                                },
                                colors: ["#37b494"]
                                // xaxis: {
                                //     mode: "time"
                                // }
                            },
                            Data: []
                        }
                        $scope.devices.push(device);
                    }
                    for(var i=0; i<$scope.devices.length; i++) {
                        var device = $scope.devices[i];
                        $log.log(device.sensors);
                        for(var j=0; j<device.sensors.length; j++) {
                            $http.get('http://app.fisbang.com/api/sensor/'+device.sensors[j]+'/data?limit=100').success(function(response){
                                $log.log(response);
                                var data = [];
                                for(var k=0;k<response.length; k++) {
                                    //data.push([response[k].timestamp, response[k].value]);
                                    data.push([k, response[k].value]);
                                }
                                device.Data.push({ data: data, label: 'Energy' });
                            }).error(function(response){
                                $log.log(response);
                            });
                        }
                    }

                    $log.log($scope.devices);
                                        
                }).error(function(response){
                    $log.log("error");
                });
            })
            .error(function() {
                $log.log("error");                
            });
  }]);
