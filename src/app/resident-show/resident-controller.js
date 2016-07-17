(function(){
	angular 
		.module('pcui')
		.controller('ResidentController', ResidentController)

		function ResidentController($scope, $stateParams, ResidentInfoService){
			$scope.residentInfo;

			ResidentInfoService.getResidentInfo($stateParams.id).then(function(response){
				$scope.residentInfo = response.data
			})

			
		};
})();