(function() {
	'use strict';

	angular
		.module('pcui')
		.controller('LoginCtrl',  LoginCtrl)

	function LoginCtrl(UserSession, $scope, $state) {

		$scope.user = {}



		var login = function(user){
			var user_session = new UserSession({user: user})
			user_session.$save(
				function(data){
					window.localStorage['userId'] = data.user.id;
					window.localStorage['userName'] = data.user.username;
					window.localStorage['name'] = data.user.first_name + ' ' + data.user.last_name
					$state.go('home');
				},
				function(err){
					var error;
					if(err["data"]){
						error = err["data"]["error"]
					}
					alert(error);
				}
			)
		}

		$scope.login = function(){
			login($scope.user)
		}


	}
})();