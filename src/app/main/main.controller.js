(function() {
  'use strict';

  angular
    .module('pcui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, ResidentService, $firebaseArray, Auth, Users) {
    
    console.log(Users.currentUser())

  }
})();
