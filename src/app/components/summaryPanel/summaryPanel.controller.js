(function() {
  'use strict';

angular
    .module('ng-shop')
    .controller('SummaryController', SummaryController);


    SummaryController.$inject = ['$scope', 'FirebaseFactory', 'shoppingCartService', 'FirebaseAuthFactory', 'loginPanelService', '$location','$q'];

    function SummaryController($scope, FirebaseFactory, shoppingCartService, FirebaseAuthFactory, loginPanelService, $location, $q) {

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
      vm.buyItems = buyItems;

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
      }

      function buy() {
        var arrayOfPromisses = [];
        if(vm.cartItems.length > 0) {
          for(var i = 0; i<vm.cartItems.length; i++) {
            arrayOfPromisses.push(FirebaseFactory.reduceCountInFB(vm.cartItems[i]));
          }
          return $q.all(arrayOfPromisses);
        } else {
          return $q.reject('No items to remove my friend!');
        }
      }

      function buyItems() {
        buy()
        .then(function() {
          return FirebaseFactory.destroyCartOfSpecificUser();
        })
        .then(function() {
          $location.path("/");
        })
      }
    }
})();

