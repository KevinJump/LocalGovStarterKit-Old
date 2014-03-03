angular.module("umbraco")
	.controller("Jumoo.OpeningSoonController", 
	function($scope, assetsService) {
	
		assetsService.loadCss("/App_Plugins/OpeningSoon/Scripts/jquery.timepicker.css");
	
		$scope.resetDays = function()
		{
			$scope.model.value = [
				{ 'name': 'Monday',   'scheduled': true, 'open': '',  'close' : '' },
				{ 'name': 'Tuesday',  'scheduled': true, 'open': '',  'close' : '' },
				{ 'name': 'Wednesday','scheduled': true, 'open': '',  'close' : '' },
				{ 'name': 'Thursday', 'scheduled': true, 'open': '',  'close' : '' },
				{ 'name': 'Friday',   'scheduled': true, 'open': '',  'close' : '' },
				{ 'name': 'Saturday', 'scheduled': true, 'open': '',  'close' : '' },
				{ 'name': 'Sunday',   'scheduled': true, 'open': '',  'close' : '' }
			]; 
		}

		if ( !$scope.model.value ) { $scope.resetDays() ; }
		
		$scope.clearAll = function() { $scope.resetDays() ; }
		
		$scope.autofill = function() {
			// take the values in monday, and set every other day to the same
			if ( $scope.model.value[0].scheduled ) {
				var openVal = "" ; 
				var closeVal = "" ; 
				var open2Val = "" ; 
				var close2Val = "" ; 
				
				if ( $scope.model.value[0].open ) {	openVal = $scope.model.value[0].open; }
				if ( $scope.model.value[0].close ) { closeVal = $scope.model.value[0].close; }
				if ( $scope.model.value[0].open2 ) { open2Val = $scope.model.value[0].open2; } 
				if ( $scope.model.value[0].close2 ) { close2Val = $scope.model.value[0].close2; } 
				
				$.each($scope.model.value, function(index, element) {
					element.open = openVal ; 
					element.close = closeVal ; 
					element.open2 = open2Val ; 
					element.close2 = close2Val ; 
					element.scheduled = true ; 
				});
			}
		}
	})
	
	.directive('timePicker', function()   {
		return {
			restrict: 'A',
			require : 'ngModel',
			link: function(scope, element, attrs, controller) {
				element.timepicker( 
					{ 'timeFormat': 'H:i', "step": scope.model.config.dropdownTimestep});
			
				element.on('change', function() {
					scope.$apply(function() {
						var mytime = element.timepicker('getTime', new Date());
						var timestring = 
							("0" + mytime.getHours()).substr(-2,2) + ":" + 
							("0" + mytime.getMinutes()).substr(-2,2) ; 
						controller.$setViewValue(timestring);
						});
				});
			}
		}
	});
	