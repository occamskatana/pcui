(function(){
	angular
		.module('pcui')
		.controller('ChatController', ChatController)

		function ChatController($scope, $firebaseArray){

			$scope.messages = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/1/chat'))

			var getMessages = function(id){
				// var ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/chat')
				//  $scope.messages = $firebaseArray(ref)
				//  console.log("rawr")

				console.log(id)
			}


		}
})();