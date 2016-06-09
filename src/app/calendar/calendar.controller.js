(function(){
	angular
		.module('pcui')
		.controller('CalendarController', CalendarController)

	function CalendarController($scope, $firebaseArray, ResidentService, uiCalendarConfig){
		 

      
    $scope.events = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/1/calendar'))
    
    



    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
      $scope.residents = response
      
    })


    $scope.updateOnDrop = function(event, delta, revertFunc) {
     array = $scope.uiConfig.calendar.events.events
     record = array.$getRecord(event.$id)
     record.start = event._start.valueOf()
     record.end = event._end.valueOf()

     array.$save(record)
     
     console.log(uiCalendarConfig.calendars.myCalendar.fullCalendar())
    };

    $scope.resizeDrop = function(event, jsEvent, ui, view, rawr, rawr1) {
     
     array = $scope.uiConfig.calendar.events.events
     record = array.$getRecord(event.$id)
     record.start = event._start.valueOf()
     record.end = event._end.valueOf()

     array.$save(record);
     console.log(uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', '01/01/2015'))
     uiCalendarConfig.calendars.myCalendar.fullCalendar('changeView', 'month');
    };

  

      $scope.uiConfig = {
        calendar:{
          editable: true,
          header:{
            left: 'month agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          events:  {
            events: $scope.events
          },
          defaultView: 'agendaWeek',
          // dayClick: $scope.alertEventOnClick,
          eventDrop: $scope.updateOnDrop,
          eventResize: $scope.resizeDrop
        }
     }

 $scope.changeCalendar = function(id) {
      $scope.uiConfig.calendar.events = null;

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