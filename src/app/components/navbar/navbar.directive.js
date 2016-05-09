(function() {
    'use strict';

angular
    .module('ng-shop')
    .directive('acmeNavbar', acmeNavbar);

    acmeNavbar.$inject = ['shoppingCartService', 'loginPanelService', 'FirebaseAuthFactory'];

    function acmeNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            scope: {},
            controller: NavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function NavbarController ($window, $location, $timeout, shoppingCartService, loginPanelService, FirebaseAuthFactory) {

            var vm = this;
            vm.logOut = logOut;
            vm.hello = false;
            vm.bye = false;

            vm.cart = shoppingCartService.cart;
            vm.userData = loginPanelService.userData;


            function logOut () {
                $window.location.hash = '#/';
                shoppingCartService.setRef();
                loginPanelService.logOut();
                FirebaseAuthFactory.logOut();
                vm.bye = true;
                $timeout(function () {
                  vm.bye = false;
                }, 2000);
                shoppingCartService.goToSummary(false);
            }
        }
    }

})();
