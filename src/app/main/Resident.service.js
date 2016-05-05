(function(){
	'use strict';

	angular
		.module('pcui')
		.factory('ResidentService', ResidentService)

		function ResidentService($firebaseArray){
			
			var ref = new Firebase("https://sp2.firebaseio.com/residents")

			
			var all = $firebaseArray(ref);
			
			var service = {
				all: all
			}
			
			return service
		}
})();