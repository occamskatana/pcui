(function() {
  'use strict';

  angular
    .module('pcui')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
