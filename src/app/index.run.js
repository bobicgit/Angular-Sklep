(function() {
  'use strict';

  angular
    .module('yoman')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
