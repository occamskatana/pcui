(function(){

	angular
		.module('pcui')
		.controller('MapController', function(NgMap, $scope){

			$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg";

			
			NgMap.getMap().then(function(map) {
		    console.log(map.getCenter());
		    console.log('markers', map.markers);
		    console.log('shapes', map.shapes);
		  });




		});

})();