(function() {
  'use strict';

  angular
    .module('pcui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ResidentService, Auth, $firebaseArray) {
    
    Auth.currentUser().then(function(user){
    	$scope.userEmail = user.email
    });


    $scope.isLoading = true;

    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
    	$scope.residents = response;
      console.log(response)
      $scope.isLoading = false;
    });

    $scope.messages;
    $scope.message = {}
    $scope.myId = 'John Carter'
    $scope.changeUserMessages = function(id){
      $scope.messages = $firebaseArray(new Firebase('https://evolutiontech.firebaseio.com/residents/' + id + '/chat'))
      console.log($scope.messages)
    }

    $scope.sendMessage = function(){
      var d = Date.now()
      $scope.messages.$add({text: $scope.message.text, userId: $scope.myId, time: d })
      $scope.message.text = ''
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
