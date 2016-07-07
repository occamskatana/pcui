(function() {
  'use strict';

  angular
    .module('pcui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ResidentService, Auth, $firebaseArray, $window) {
    $scope.userName = $window.localStorage.name
    $scope.isLoading = true;

    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
    	$scope.residents = response;
      $scope.isLoading = false;
    });

    $scope.messages;
    $scope.message = {}
    $scope.myId = $window.localStorage.name;

    
    $scope.changeUserMessages = function(id){
      $scope.messages = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/chat'))
    }

    $scope.sendMessage = function(){
      var d = Date.now()
      $scope.messages.$add({text: $scope.message.text, userId: $scope.myId, time: d })
      $scope.message.text = ''
    }


    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5hEVOsgZkdBXsBdF9t6psC5JuOxK2Agg";

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
