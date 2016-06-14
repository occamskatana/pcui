(function(){

	angular
		.module('pcui')
		.controller('MapController', MapController);

	function MapController($scope, NgMap, $firebaseObject){
		
		NgMap.getMap().then(function(map){
		
		})


	}
})()