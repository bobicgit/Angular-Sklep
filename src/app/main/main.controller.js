(function() {
  'use strict';

  angular
    .module('yoman')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

      
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users');
            ref.onAuth(checkStatus);
            


      function checkStatus (data) {
        console.log(data);
      }
    
  }
})();
