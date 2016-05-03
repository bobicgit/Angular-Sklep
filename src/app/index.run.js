(function() {
  'use strict';

  angular
    .module('ng-shop')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
