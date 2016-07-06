(function(){
	'use strict';

	angular
		.module('pcui')
		.factory('ResidentService', ResidentService)

		function ResidentService($resource){
			return $resource('http://localhost:3000/api/v1/users/:user_id/residents', {user_id: '@user_id'})
		}
})();