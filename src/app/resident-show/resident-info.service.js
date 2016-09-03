(function(){
	angular 
		.module('pcui')
		.factory('ResidentInfoService', ResidentInfoService)

		function ResidentInfoService($http){
			var services = {};

			services.getResidentInfo = function(id){
				return $http.get('https://frozen-reaches-83397.herokuapp.com//api/v1/residents/' + id)
			}

			return services
		}
})();