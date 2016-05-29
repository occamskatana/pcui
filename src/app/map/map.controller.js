(function(){

	angular
		.module('pcui')
		.controller('MapController', MapController);

	function MapController($scope, NgMap){
		NgMap.getMap().then(function(map){
			console.log(map)
		})
	}
})()