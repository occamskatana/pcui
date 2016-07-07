(function() {
	'use strict';

	angular
		.module('pcui')
		.controller('LoginCtrl',  LoginCtrl)

	function LoginCtrl($scope, $state, $resource, $mdDialog, $window) {
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

		var loginSuccessCallback = function(response){
			var user = response.data
			$window.localStorage.id = user.id;
			$window.localStorage.email = user.uid;
			$window.localStorage.name = user.name;
			$state.go('home')
		}

		var loginErrorCallback = function(err){
			var error = err["data"]["errors"][0]
			showDialog(error);
			$scope.loading = false
		}
		$scope.user = {}
		$scope.loading = false;

		$scope.login = function(){
			$scope.loading = true;
			var UserSession = $resource('https://frozen-reaches-83397.herokuapp.com/api/v1/auth/sign_in.json');
			var userSession = new UserSession({email: $scope.user.email, password: $scope.user.password});
			userSession.$save(function(data){loginSuccessCallback(data)}, function(err){loginErrorCallback(err)})

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