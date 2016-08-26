(function(){
	angular 
		.module('pcui')
		.controller('ResidentController', ResidentController)

		function ResidentController($scope, $stateParams, ResidentInfoService, $firebaseArray){
			$scope.residentInfo;
			var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' +  $stateParams.id +'/tasks')

			$scope.tasks = $firebaseArray(ref);

			ResidentInfoService.getResidentInfo($stateParams.id).then(function(response){
				$scope.residentInfo = response.data
			});

			$scope.toggleTaskComplete = function(task){
				if (task.complete == false){
					task.complete = true;
				} else {
					task.complete = false;
				}

				$scope.tasks.$save(task);
			}




			
		};
})();