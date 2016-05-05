(function(){
	angular
		.module('pcui')
		.factory('UserSession', UserSession)


		/** @ngInject */
		function UserSession($resource) {
			return $resource("http://localhost:3000/users/sign_in.json");
		}


})();