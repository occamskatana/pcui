(function() {
  'use strict';

  angular
    .module('pcui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html'
      })

      .state('resident', {
        url: '/residents/:id',
        templateUrl: 'app/resident-show/resident-show.html',
        controller: 'ResidentController'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
      

    $urlRouterProvider.otherwise('/login');
  }

})();
