(function(){

	angular
		.module('pcui')
		.controller('MapController', MapController);

	function MapController($scope, NgMap, $firebaseObject){
		NgMap.getMap().then(function(map){
			console.log(map)
		})


		var ref = new Firebase('https://evolutiontech.firebaseio.com/residents')
		var residentLocations = $firebaseObject(ref)
		console.log("sex")

		residentLocations.$loaded.then(function(response){
			console.log(response)
		})

	}
})()