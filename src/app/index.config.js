(function() {
  'use strict';

  angular
    .module('pcui')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, AuthProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    AuthProvider.loginPath('http://https://frozen-reaches-83397.herokuapp.com/users/sign_in.json');
    $httpProvider.defaults.withCredentials = true;
  }


})();
