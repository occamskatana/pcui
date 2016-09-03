(function(){
	angular 
		.module('pcui')
		.controller('ResidentController', ResidentController)

		function ResidentController($scope, $stateParams, ResidentInfoService, $firebaseObject){
			$scope.residentInfo;
			$scope.currentLocation = $firebaseObject(new Firebase('https://evolutiontech.firebaseio.com/residents/' + $stateParams.id + '/current_location'));
			
			
			


			ResidentInfoService.getResidentInfo($stateParams.id).then(function(response){
				$scope.residentInfo = response.data
			});





			
		};
})();