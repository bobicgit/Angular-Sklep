(function() {
  'use strict';

  angular
    .module('yoman')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    NavbarController.$inject = ['shoppingCartService', 'loginPanelService', 'FirebaseAuthFactory'];

    function NavbarController($timeout, shoppingCartService, loginPanelService, FirebaseAuthFactory) {

      var vm = this;
      vm.logOut = logOut;
      vm.hello = false;
      vm.bye = false;

      vm.cart = shoppingCartService.cart;
      vm.userData = loginPanelService.userData;
      vm.checkStatus = checkStatus;

      checkStatus();


      function logOut () {
        loginPanelService.logOut();
        vm.bye = true;
        $timeout(function () {
          vm.bye = false;
        }, 2000);
      }

      function checkStatus () {
        FirebaseAuthFactory.checkStatus();
      }

    }


  }

})();
