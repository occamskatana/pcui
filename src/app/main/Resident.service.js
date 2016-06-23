(function(){
	'use strict';

	angular
		.module('pcui')
		.factory('ResidentService', ResidentService)

		function ResidentService($resource){
			return $resource('http://https://frozen-reaches-83397.herokuapp.com/api/v1/users/:user_id/residents', {user_id: '@user_id'})
		}
})();