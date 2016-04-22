(function() {
  'use strict';

angular
    .module('yoman')
    .controller('ShoppingCartController', ShoppingCartController);

  /** @ngInject */

    ShoppingCartController.$inject = ['FirebaseFactory', 'shoppingCartService'];

    function ShoppingCartController(FirebaseFactory, shoppingCartService) {



        var vm = this;
        vm.removeItem = removeItem;
        vm.add = add;
        vm.removeOneItem = removeOneItem;
        vm.sum;
        

        vm.cartItems = [];

        cartItems();



        function cartItems() {
            
            FirebaseFactory.readCart()
            .then(function(data) {
                vm.cartItems = data;
                updateSum();
                shoppingCartService.updateAmount(data);
            });
        }


        function removeItem (item) {

            console.log(item);

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


        function add (item) {
      
            FirebaseFactory.addToCart(item)
            .then(function(item) {
                var l = vm.cartItems.length;
                for ( var i = 0 ; i < l ; i ++ ) {
                    if ( vm.cartItems[i].id === item.id ) {
                        vm.cartItems[i].amount ++;
                        updateSum();
                    return;
                    }
                }
            });
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

    

   
  }


})();

