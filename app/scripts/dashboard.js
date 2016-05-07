$(window).ready(function	()	{
	
	//Number Animation
	// var currentEnergy = $('#currentEnergy').text();
	
	// $({numberValue: 0}).animate({numberValue: currentEnergy}, {
	// 	duration: 2500,
	// 	easing: 'linear',
	// 	step: function() { 
	// 		$('#currentEnergy').text(Math.ceil(this.numberValue)); 
	// 	}
	// });
			
	// var currentBalance = $('#currentBalance').text();
	
	// $({numberValue: 0}).animate({numberValue: currentBalance}, {
	// 	duration: 2500,
	// 	easing: 'linear',
	// 	step: function() { 
	// 		$('#currentBalance').text(Math.ceil(this.numberValue)); 
	// 	}
	// });
	
	//Refresh Widget
	$('.refresh-widget').click(function() {
		var _overlayDiv = $(this).parent().parent().parent().parent().find('.loading-overlay');
		_overlayDiv.addClass('active');
		
		setTimeout(function() {
			_overlayDiv.removeClass('active');
		}, 2000);
		
		return false;
	});
		
    // Popover
    $("[data-toggle=popover]").popover();
	
    // Tooltip
    $("[data-toggle=tooltip]").tooltip();
			
	$("<div id='tooltip'></div>").css({
		position: "absolute",
		display: "none",
		border: "1px solid #222",
		padding: "4px",
		color: "#fff",
		"border-radius": "4px",
		"background-color": "rgb(0,0,0)",
		opacity: 0.90
	}).appendTo("body");

	//Sparkline
	$('#energy').sparkline([15,19,20,22,33,27,31,27,19,30,21,10,15,18,25,9], {
		type: 'bar', 
		barColor: '#FC8675',	
		height:'35px',
		weight:'96px'
	});
	$('#balances').sparkline([220,160,189,156,201,220,104,242,221,111,164,242,183,165], {
		type: 'bar', 
		barColor: '#65CEA7',	
		height:'35px',
		weight:'96px'
	});
	
	//Resize graph when toggle side menu
	// $('.navbar-toggle').click(function()	{
	// 	setTimeout(function() {
	// 		$.plot($('#placeholder-main'), [init], options);
	// 		$.plot($('#placeholder2'), [init], options);
	// 	},500);	
	// });
	
	// $('.size-toggle').click(function()	{
	// 	//resize morris chart
	// 	setTimeout(function() {
	// 		$.plot($('#placeholder-main'), [init], options);			
	// 		$.plot($('#placeholder2'), [init], options);			
	// 	},500);
	// });

	//Refresh statistic widget
	$('.refresh-button').click(function() {
		var _overlayDiv = $(this).parent().children('.loading-overlay');
		_overlayDiv.addClass('active');
		
		setTimeout(function() {
			_overlayDiv.removeClass('active');
		}, 2000);
		
		return false;
	});
	
	$(window).resize(function(e)	{
		
		//Sparkline
		$('#energy').sparkline([15,19,20,22,33,27,31,27,19,30,21,10,15,18,25,9], {
			type: 'bar', 
			barColor: '#fa4c38',	
			height:'35px',
			weight:'96px'
		});
		$('#balances').sparkline([220,160,189,156,201,220,104,242,221,111,164,242,183,165], {
			type: 'bar', 
			barColor: '#92cf5c',	
			height:'35px',
			weight:'96px'
		});

		//resize morris chart
		// setTimeout(function() {
		// 	$.plot($('#placeholder-main'), [init], options);
		// 	$.plot($('#placeholder2'), [init], options);
		// },500);
	});
	
	$(window).load(function(e)	{
	
		var todayEnergy = $('#todayEnergy').text();
		$({numberValue: 0}).animate({numberValue: todayEnergy}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#todayEnergy').text(Math.ceil(this.numberValue)); 
			}
		});
				
		var energyPercentage = $('#energyPercentage').text();
		$({numberValue: 0}).animate({numberValue: energyPercentage}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#energyPercentage').text(Math.ceil(this.numberValue)); 
			}
		});
			
		var todayBalance = $('#todayBalance').text();
		$({numberValue: 0}).animate({numberValue: todayBalance}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#todayBalance').text(Math.ceil(this.numberValue)); 
			}
		});
	
		var balancePercentage = $('#balancePercentage').text();
		$({numberValue: 0}).animate({numberValue: balancePercentage}, {
			duration: 2500,
			easing: 'linear',
			step: function() { 
				$('#balancePercentage').text(Math.ceil(this.numberValue)); 
			}
		});
			
		// setInterval(function() {
		// 	var currentNumber = $('#todayEnergy').text();
		// 	var randomNumber = Math.floor(Math.random()*20) + 1;
		// 	var newNumber = parseInt(currentNumber, 10) + parseInt(randomNumber, 10); 
		
		// 	$({numberValue: currentNumber}).animate({numberValue: newNumber}, {
		// 		duration: 500,
		// 		easing: 'linear',
		// 		step: function() { 
		// 			$('#todayEnergy').text(Math.ceil(this.numberValue)); 
		// 		}
		// 	});
		// }, 3000);
			
		// setInterval(function() {
		// 	var currentNumber = $('#todayBalance').text();
		// 	var randomNumber = Math.floor(Math.random()*50) + 1;
		// 	var newNumber = parseInt(currentNumber, 10) + parseInt(randomNumber, 10); 
		
		// 	$({numberValue: currentNumber}).animate({numberValue: newNumber}, {
		// 		duration: 500,
		// 		easing: 'linear',
		// 		step: function() { 
		// 			$('#todayBalance').text(Math.ceil(this.numberValue)); 
		// 		}
		// 	});
		// }, 5000);
	});
});
