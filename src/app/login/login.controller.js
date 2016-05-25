(function() {
	'use strict';

	angular
		.module('pcui')
		.controller('LoginCtrl',  LoginCtrl)

	function LoginCtrl($scope, $state, Auth) {

		$scope.user = {}

		$scope.login = function(){
			Auth.login($scope.user).then(function(user){
				console.log(user)
			})
		}

		$scope.$on('devise:login', function(event, currentUser){
			console.log(event, currentUser)
		});

		$scope.$on('devise:new-session', function(event, currentUser){
			window.localStorage.clear();
			window.localStorage.id = currentUser.id;
			window.localStorage.email = currentUser.email;
			$state.go('home')
		})


	}
})();