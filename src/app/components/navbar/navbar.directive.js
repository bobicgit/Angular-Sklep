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
    NavbarController.$inject = ['shoppingCartService'];

    function NavbarController(shoppingCartService) {
      var vm = this;

      vm.cart = shoppingCartService.cart;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      
    }
  }

})();
