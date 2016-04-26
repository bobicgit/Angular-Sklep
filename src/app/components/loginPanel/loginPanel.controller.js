(function() {
  'use strict';

angular
    .module('yoman')
    .controller('LoginPanelController', LoginPanelController);

  /** @ngInject */

    LoginPanelController.$inject = ['$window', '$location' ,'FirebaseAuthFactory', 'loginPanelService'];

    function LoginPanelController ($window, $location, FirebaseAuthFactory, loginPanelService) {

      var vm = this;

      vm.signUp = false;

      vm.email;
      vm.password;
      vm.firstName;
      vm.surname;
      vm.phoneNumber;
      vm.addressStreet;
      vm.addressPostCode;
      vm.addressCity;
      vm.addressCountry;

      vm.userData = {};


     


      vm.authData;
      vm.addUser = addUser;
      vm.authUser = authUser;
      vm.toggleSignUp = toggleSignUp;


      function toggleSignUp () {
        vm.signUp = (!vm.signUp);
      }


    	function addUser(email, password){
        FirebaseAuthFactory.addUser(email, password)
        .then(function(accountData){
          vm.userData.email = vm.email;
          vm.userData.password = vm.password;
          vm.userData.firstName = vm.firstName;
          vm.userData.surname = vm.surname;
          vm.userData.phoneNumber = vm.phoneNumber;
          vm.userData.addressStreet = vm.addressStreet;
          vm.userData.addressCity = vm.addressCity;
          vm.userData.addressCountry = vm.addressCountry;
          vm.userData.id = accountData.uid;
          console.log(vm.userData);
            FirebaseAuthFactory.storeUserData(accountData.uid, vm.userData);
           // getUserData(authData.uid);
            console.log("Authenticated successfully with payload:", accountData.uid);

        }, function(error) {
            console.log("Login failed:", error);
        })
       }


       function authUser(email, password) {
          FirebaseAuthFactory.authUser(email, password)
          .then(function (authData) {
            FirebaseAuthFactory.getUserData(authData.uid)
            .then(function (userData) {
              vm.userData = userData;
              loginPanelService.updateUserData(vm.userData);
              loginPanelService.sayHello();
              $window.location.hash = '#/';
            });
          })
       }


  }


})();

