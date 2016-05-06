(function() {
  'use strict';

angular
    .module('ng-shop')
    .controller('SummaryController', SummaryController);


    SummaryController.$inject = ['$scope', 'FirebaseFactory', 'shoppingCartService', 'FirebaseAuthFactory', 'loginPanelService', '$location','cacheUserDetails'];

    function SummaryController($scope, FirebaseFactory, shoppingCartService, FirebaseAuthFactory, loginPanelService, $location, cacheUserDetails) {

      var vm = this,
          userId;


      vm.newAddress;

      vm.cartItems = [];
      vm.sum = 0;
      vm.userInfos = {};
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
            vm.userInfos = userInfofromDB.customerDetails;
            vm.newAddress = vm.userInfos.addressCountry + ' ' + vm.userInfos.addressCity + ' ' + vm.userInfos.addressStreet;

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
        vm.newAddress = vm.userInfos.addressCountry + ' ' + vm.userInfos.addressCity + ' ' + vm.userInfos.addressStreet;
        cacheUserDetails.cacheNewAddress(vm.newAddress);
        console.log(vm.newAddress);
      }

      function buy() {
          vm.cartItems.forEach(function(item) {
            FirebaseFactory.removeOneFromCart(item);
          });
         $location.path("/");
      }
    }
})();

