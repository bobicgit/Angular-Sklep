(function() {
  'use strict';

angular
    .module('ng-shop')
    .controller('SummaryController', SummaryController);


    SummaryController.$inject = ['FirebaseFactory', 'shoppingCartService', 'FirebaseAuthFactory'];

    function SummaryController(FirebaseFactory, shoppingCartService, FirebaseAuthFactory) {


    var vm = this;

    vm.cartItems = [];
    vm.sum = 0;

    initialize();




      function initialize () {
        FirebaseAuthFactory.initialize(); 
        readCart();
      }   
    

        function readCart() {
            
            FirebaseFactory.readCart()
            .then(function(data) {
                vm.cartItems = data;
                updateSum();
                shoppingCartService.updateAmount(data);
            });
        }

        function updateSum () {

            var sum = 0;
            vm.cartItems.forEach(function(item) {
                sum += item.price * item.amount;
            });
            vm.sum = sum;
        }

   
  }


})();

