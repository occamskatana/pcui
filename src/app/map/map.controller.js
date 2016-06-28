(function(){

	angular
		.module('pcui')
		.controller('MapController', function(NgMap){
			NgMap.getMap().then(function(map) {
		    console.log(map.getCenter());
		    console.log('markers', map.markers);
		    console.log('shapes', map.shapes);
		  });
		});

})();