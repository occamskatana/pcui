(function(){
	angular
		.module('pcui')
		.controller('CalendarController', CalendarController)

	function CalendarController($scope, $firebaseArray, ResidentService, uiCalendarConfig){
		 

      
    $scope.events = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/1/calendar'))
    
    console.log(uiCalendarConfig)



    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
      $scope.residents = response
      console.log($scope.residents)
    })


    $scope.updateOnDrop = function(event, delta, revertFunc) {
     array = $scope.uiConfig.calendar.events.events
     record = array.$getRecord(event.$id)
     record.start = event._start.valueOf()
     record.end = event._end.valueOf()

     array.$save(record)

    };

  

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
          eventDrop: $scope.updateOnDrop,
          // eventResize: $scope.alertOnResize
        }
     }

 $scope.changeCalendar = function(id) {
      console.log('before change calendar', $scope.uiConfig.calendar)
      $scope.uiConfig.calendar.events = null;
      console.log('after change calendar', $scope.uiConfig.calendar)

      ref = new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/calendar');
      
      $scope.uiConfig.calendar.events = {
        events: $firebaseArray(ref)
      }

    }
   
   

    // $scope.events.$add({
    //   title: 'Test Event',
    //   start: moment().add(1, 'month').valueOf(),
    //   end: moment().add(1, 'month').valueOf() + 100000
    // });

	};
})();