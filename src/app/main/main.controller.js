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

    $scope.toggleTask = function(task){
      if(task.complete == false){
        task.complete = true;
      } else {
        task.complete = false
      }
       $scope.tasks.$save(task).then(function(ref){
        console.log(ref)
        })
    }

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

           
      $scope.showListBottomSheet = function(task) {
          $scope.task = task
          $mdBottomSheet.show({
            templateUrl: '/app/main/template.html',
            controller: 'BottomSheetController',
            locals: {task: $scope.task}
          }).then(function(clickedItem) {
            //$scope.alert = clickedItem.name + ' clicked!';
          });
       };
      }
  
})();


(function(){
  angular
    .module('pcui')
    .controller('BottomSheetController', BottomSheetController)


  function BottomSheetController(task, $scope){
    $scope.task = task
    console.log(task)

    $scope.toggleTask = function(task){
      if(task.complete == false){
        task.complete = true;
      } else {
        task.complete = false
      }
       $scope.tasks.$save(task).then(function(ref){
        console.log(ref)
        })
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

