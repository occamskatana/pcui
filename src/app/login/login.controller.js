(function() {
	'use strict';

	angular
		.module('pcui')
		.controller('LoginCtrl',  LoginCtrl)

	function LoginCtrl(UserSession, $scope, $state, Auth) {

		$scope.user = {}

		$scope.login = function(){
			Auth.login($scope.user).then(function(user){
				window.localStorage.user = $scope.user
			})
		}

		$scope.$on('devise:login', function(event, currentUser){
			
		});

		$scope.$on('devise:new-session', function(event, currentUser){
			console.log(event, currentUser)
			$state.go('home')
		})


	}
})();