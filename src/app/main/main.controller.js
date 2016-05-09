(function() {
  'use strict';

  angular
    .module('pcui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ResidentService, Auth) {
    
    Auth.currentUser().then(function(user){
    	$scope.userEmail = user.email
    });

    ResidentService.query({user_id: window.localStorage.id}).$promise.then(function(response){
    	$scope.residents = response;
    });
    


  }
})();
