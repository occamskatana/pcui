(function(){
	angular
		.module('pcui')
		.controller('CalendarController', CalendarController)

	function CalendarController($scope, $firebaseArray){
		 var ref = new Firebase("https://e-tech.firebaseio.com/users/bdsimmons/events");

    
    $scope.events = $firebaseArray(ref)
  

    $scope.alertOnDrop = function(event, delta, revertFunc) {
     array = $scope.events
     record = array.$getRecord(event.$id)
     record.start = event._start.valueOf()
     record.end = event._end.valueOf()

     array.$save(record)

    };

    $scope.events.$loaded(function(){

      $scope.uiConfig = {
        calendar:{
          editable: true,
          header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          events: $scope.events,
          // dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          // eventResize: $scope.alertOnResize
        }
      };

    })
   

    // $scope.events.$add({
    //   title: 'Test Event',
    //   start: moment().add(1, 'month').valueOf(),
    //   end: moment().add(1, 'month').valueOf() + 100000
    // });

	};
})();