(function() {
  'use strict';

  angular
    .module('pcui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ResidentService, $firebaseArray, $window, $mdBottomSheet) {
    $scope.userName = $window.localStorage.name
    $scope.isLoading = true;
    $scope.messages;
    $scope.tasks;
    $scope.message = {}
    $scope.myId = $window.localStorage.name;
    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg";
    $scope.houseList = ["1212 Quinnipiac Ave", "22 Linden", "980 Townsend Avenue", "The Cove"]
    $scope.house;
    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
    	$scope.residents = response;
      $scope.isLoading = false;
    });


   
    $scope.changeUser = function(id){
      $scope.messages = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/chat'))
      $scope.tasks = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/tasks'))
      console.log($scope.tasks)
    }

    $scope.sendMessage = function(){
      var d = Date.now()
      $scope.messages.$add({text: $scope.message.text, userId: $scope.myId, time: d, seen: false })
      $scope.message.text = ''
    }

    // $scope.toggleTask = function(task){
    //   if(task.complete == false){
    //     task.complete = true;
    //   } else {
    //     task.complete = false
    //   }
    //    $scope.tasks.$save(task).then(function(ref){
    //     console.log(ref)
    //     })
    // }

     $scope.getSelectedText = function() {
        if ($scope.houseFilter !== undefined) {
          return $scope.houseFilter;
        } else {
          return "Filter by house";
        }
      };

      $scope.clearFilter = function(){
        $scope.houseFilter = '';
      }

           
      $scope.showListBottomSheet = function(task, $event) {
          console.log($event)
          $scope.task = task
          $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list">'
                        +'<md-subheader>Manage Task</md-subheader>'
                         +'<md-list>'
                          +'<md-list-item>'
                           + '<md-button class="md-raised md-primary" ng-click="toggleTask(task)" ng-show="task.complete == false">'
                             + '<span class="md-inline-list-icon-label">Mark Task Complete</span>'
                           + '</md-button>'
                            + '<md-button class="md-raised md-warn" ng-click="toggleTask(task)" ng-show="task.complete">'
                             +'<span>Mark Task Incomplete</span>'
                            +'</md-button>'
                            +'<md-button class="md-raised reminder-button" ng-click="sendReminder(task)">'
                             + '<span>Send Reminder About This Task</span>'
                           + '</md-button>'
                          +'</md-list-item>'
                        +'</md-list>'
                      + '</md-bottom-sheet>',
            controller: 'BottomSheetController',
            locals: {task: $scope.task,
                    tasks: $scope.tasks,
                    messages: $scope.messages}
          }).then(function(clickedItem) {
           console.log(clickedItem)
          });
       };
      }
  
})();


(function(){
  angular
    .module('pcui')
    .controller('BottomSheetController', BottomSheetController)


  function BottomSheetController(task, $scope, tasks, messages, $mdBottomSheet){
    $scope.task = task
    $scope.tasks = tasks
    $scope.messages = messages;
    console.log(messages, task, tasks)

    $scope.toggleTask = function(task){
      if(task.complete == false){
        task.complete = true;
      } else {
        task.complete = false
      }
       $scope.tasks.$save(task).then(function(ref){
        
        })
       $mdBottomSheet.hide()
    }

    $scope.sendReminder = function(task){
      $scope.messages.$add({text: "You need to" + ' ' + task.name, time: Date.now(), userId: window.localStorage.name})
      $mdBottomSheet.hide()
    }
  }
})();


(function(){
  angular
    .module('pcui')
    .directive('schrollBottom', function(){
      return {
        scope: {
          schrollBottom: "="
        },
        link: function (scope, element) {
          scope.$watchCollection('schrollBottom', function (newValue) {
            if (newValue)
            {
              $(element).scrollTop($(element)[0].scrollHeight);
            }
          });
        }
      }
    })
})();

