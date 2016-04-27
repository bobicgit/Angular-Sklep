(function() {
  'use strict';

  angular
    .module('yoman')
    .controller('MainController', MainController);

  /** @ngInject */
  MainController.$inject = ['FirebaseAuthFactory'];

  function MainController(FirebaseAuthFactory) {
    var vm = this;

     initialize();



      function initialize () {
         FirebaseAuthFactory.initialize();
         
      }       
            

      
    
  }
})();
