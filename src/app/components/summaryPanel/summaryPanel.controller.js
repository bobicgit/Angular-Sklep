(function() {
  'use strict';

angular
    .module('ng-shop')
    .controller('SummaryController', SummaryController);


    SummaryController.$inject = ['$scope', 'FirebaseFactory', 'shoppingCartService', 'FirebaseAuthFactory', 'loginPanelService', '$location','cacheUserDetails'];

    function SummaryController($scope, FirebaseFactory, shoppingCartService, FirebaseAuthFactory, loginPanelService, $location,cacheUserDetails) {

      var vm = this,
          userId;

      vm.cartItems = [];
      vm.sum = 0;
      vm.userInfo = {};
      vm.showEditField = false;
      vm.showActualAddress = true;
      vm.submitEditForm = submitEditForm;
      vm.editFields = editFields;
      vm.buy = buy;

      initialize();

      function initialize () {
        FirebaseAuthFactory.initialize()
          .then(function() {
            readCart();
            userId = FirebaseFactory.readLoggedUserId();
            return userId;
          })
          .then(function(userId) {
            return FirebaseAuthFactory.getUserData(userId);
          })
          .then(function(userInfofromDB) {
            vm.userInfo = userInfofromDB.customerDetails;
            cacheUserDetails.cacheUserInfo(vm.userInfo);
          })
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

      function editFields() {
        vm.showEditField = true;
        vm.showActualAddress = false;
      }

      function submitEditForm() {
        vm.showEditField = false;
        vm.showActualAddress = true;
        cacheUserDetails.cacheUserInfo(vm.userInfo);
        //console.log(vm.userInfo);

      }

      function buy() {
        console.log(vm.cartItems);
          vm.cartItems.forEach(function(item) {
            FirebaseFactory.removeOneFromCart(item);
          });

         $location.path("/");
      }
    }
})();

