(function(){
	angular 
		.module('pcui')
		.factory('ResidentInfoService', ResidentInfoService)

		function ResidentInfoService($http){
			var services = {};

			services.getResidentInfo = function(id){
				return $http.get('http://localhost:3000/api/v1/residents/' + id)
			}

			return services
		}
})();