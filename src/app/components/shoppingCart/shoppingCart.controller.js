(function() {
  'use strict';

angular
    .module('ng-shop')
    .controller('ShoppingCartController', ShoppingCartController);


    ShoppingCartController.$inject = ['shoppingCartService', 'FirebaseFactory', 'FirebaseAuthFactory'];

    function ShoppingCartController (shoppingCartService, FirebaseFactory, FirebaseAuthFactory) {

        var vm = this;
        vm.cartItems = [];
        vm.sum;
        vm.active = true;

        vm.add = add;
        vm.removeItem = removeItem;
        vm.removeOneItem = removeOneItem;
        vm.changeStatus = changeStatus;

        vm.isLogged = shoppingCartService.status;
        vm.goToBuy = vm.isLogged.logged ? "#/summary": "#/login";

        initialize();

        function initialize () {
            readCart();
            FirebaseAuthFactory.checkStatusOfLog();
        }

        //It download cart items from database and updates the total cost

        function readCart() {

            FirebaseFactory.readCart()
            .then(function(data) {
                vm.cartItems = data;
                updateSum();
                shoppingCartService.updateAmount(data);
            });
        }

        function removeItem (item) {

            FirebaseFactory.removeFromCart(item);

            var l = vm.cartItems.length;
            for ( var i = 0 ; i < l ; i ++ ) {
                if ( vm.cartItems[i].id === item.id ) {
                    vm.cartItems.splice(i, 1);
                    updateSum();
                    shoppingCartService.updateAmount(vm.cartItems);
                    return;
                }
            }
        }

        function updateSum () {

            var sum = 0;
            vm.cartItems.forEach(function(item) {
                sum += item.price * item.amount;
            });
            vm.sum = sum;
        }

        // adding product to the cart
        // vm.active is a flag which ensure that only one request can be sended at the time

        function add (item) {

            if (vm.active) {
                vm.active = false;

                FirebaseFactory.addToCart(item)
                .then(function(item) {
                    vm.active = true;
                    var l = vm.cartItems.length;
                    for ( var i = 0 ; i < l ; i ++ ) {
                        if ( vm.cartItems[i].id === item.id ) {
                            vm.cartItems[i].amount ++;
                            updateSum();
                        return;
                        }
                    }
                },
                function () {vm.active = true});
            }
        }

        function removeOneItem (item) {

            if (item.amount > 1) {
                FirebaseFactory.removeOneFromCart(item);
                var l = vm.cartItems.length;
                for ( var i = 0 ; i < l ; i ++ ) {
                    if ( vm.cartItems[i].id === item.id ) {
                        vm.cartItems[i].amount --;
                        updateSum();
                        return;
                    }
                }
            }
        }

        function changeStatus() {
            shoppingCartService.goToSummary(true);
        }
  }
})();

