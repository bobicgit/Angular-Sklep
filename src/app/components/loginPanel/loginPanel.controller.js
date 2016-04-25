(function() {
  'use strict';

angular
    .module('yoman')
    .controller('LoginPanelController', LoginPanelController);

  /** @ngInject */

    LoginPanelController.$inject = ['FirebaseAuthFactory'];

    function LoginPanelController (FirebaseAuthFactory) {

      var vm = this;
      vm.logUser = logUser;


    	function logUser(){
        console.log('ddd');
        FirebaseAuthFactory.authUser(vm.loginEmail, vm.loginPassword)
        .then(function(authData){
            vm.authData = authData;
           // getUserData(authData.uid);
            console.log("Authenticated successfully with payload:", authData.uid);

        }, function(error) {
            console.log("Login failed:", error);
        })
    }

  }


})();

