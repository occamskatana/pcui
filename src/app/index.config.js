(function() {
  'use strict';

  angular
    .module('pcui')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, AuthProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    AuthProvider.loginPath('http://localhost:3000/users/sign_in.json');
  }


})();
