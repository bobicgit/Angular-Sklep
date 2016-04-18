(function() {
    'use strict';

angular
    .module('yoman')
    .controller('ShoppingCartController', ShoppingCartController);

  

    ShoppingCartController.$inject = ['ShoppingCart'];

    function ShoppingCartController(ShoppingCart) {

        var vm = this;
        vm.cartItems = [];
        vm.sum;
        vm.updteCartItems = updateCartItems;
        vm.removeItem = removeItem;
        vm.add = add;
        vm.removeOneItem = removeOneItem;
        
    
        updateCartItems();



        function updateCartItems() {
            console.log('ssss');
            vm.cartItems = ShoppingCart.readCart();
            console.log('cartItems' + vm.cartItems);
            ShoppingCart.sum();
            vm.sum = ShoppingCart.readSum();
        }

        function removeItem (item) {
            ShoppingCart.remove(item);
            updateCartItems();
        }

        function add (item, amount) {
            ShoppingCart.add(item, amount);
            updateCartItems();
        }

        function removeOneItem (item) {
            ShoppingCart.removeOneItem(item);
        }

        
    }


})();
