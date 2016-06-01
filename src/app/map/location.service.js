(function(){
	angular
		.module('pcui')
		.factory('LocationService', LocationService)


	function LocationService($firebaseObject){
		var services = {}

		var getLocation = function(){
			var ref = new Firebase('https://evolutiontech.firebaseio.com/residents')
			var residentLocations = $firebaseObject(ref)
			return residentLocations
		}

		var ref = new Firebase('https://evolutiontech.firebaseio.com/residents')
		var residentLocations = $firebaseObject(ref)

		residentLocations.$loaded.then(function(){
			console.log(residentLocations)
		})

		console.log(residentLocations, "this is get location")

		return services 
		
	}
})();