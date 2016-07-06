(function() {
	'use strict';

	angular
		.module('pcui')
		.controller('LoginCtrl',  LoginCtrl)

	function LoginCtrl($scope, $state, $resource, $mdDialog) {
		var showDialog = function(error){
			$mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Problem logging in')
        .textContent(error)
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
    	);
		}
		$scope.user = {}
		$scope.loading = false;
		$scope.login = function(){
			var SignIn = $resource('https://frozen-reaches-83397.herokuapp.com/users/sign_in.json')
			var userSession = new SignIn({email: $scope.user.email, password: $scope.user.password});
			userSession.$save(function(data){
				console.log(data);
				window.localStorage.userId = data.id;
				window.localStorage.userName = data.first_name + ' ' + data.last_name;
				$scope.user = {};
				$state.go('home')
			}, function(err){
				var error = err["data"]["error"] || err.data.join('. ');
				showDialog(err);
				$scope.loading = false;
			})
			$scope.loading = true;
		}

		// $scope.$on('devise:login', function(event, currentUser){
		// 	console.log(event, currentUser)
		// });

		// $scope.$on('devise:new-session', function(event, currentUser){
		// 	window.localStorage.clear();
		// 	window.localStorage.id = currentUser.id;
		// 	window.localStorage.email = currentUser.email;
		// 	$state.go('home')
		// })


	}
})();