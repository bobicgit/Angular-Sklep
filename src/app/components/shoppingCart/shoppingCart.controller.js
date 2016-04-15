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
        vm.addOneItem = addOneItem;
        vm.removeOneItem = removeOneItem;
        
    
        updateCartItems();



        function updateCartItems() {
            vm.cartItems = ShoppingCart.readCart();
            ShoppingCart.sum();
            vm.sum = ShoppingCart.readSum();
        }

        function removeItem (item) {
            ShoppingCart.remove(item);
            updateCartItems();
        }

        function addOneItem (item) {
            console.log('dodano jeden' + item);
        }

        function removeOneItem (item) {
            console.log('usunięto jeden' + item);
        }

        
    }


})();
