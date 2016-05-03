(function() {
    'use strict';

angular
    .module('ng-shop')
    .controller('LoginPanelController', LoginPanelController);

    /** @ngInject */

    LoginPanelController.$inject = ['$window', '$location' ,'FirebaseAuthFactory', 'loginPanelService', 'shoppingCartService'];

    function LoginPanelController ($window, $location, FirebaseAuthFactory, loginPanelService, shoppingCartService) {

        var vm = this;

        vm.userData = {};
        vm.email = '';
        vm.firstName = '';
        vm.surname = '';
        vm.phoneNumber = '';
        vm.addressStreet = '';
        vm.addressPostCode = '';
        vm.addressCity = '';
        vm.addressCountry = '';

        vm.signUp = false;
        vm.wrongEmail = false;

        vm.numberPattern = '\\d+';
        vm.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        vm.modelOption = { updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } };

        vm.addUser = addUser;
        vm.authUser = authUser;
        vm.toggleSignUp = toggleSignUp;
        

        initialize();

        function initialize () {
            FirebaseAuthFactory.initialize(); 
        }   


        function addUser(email, password){
            FirebaseAuthFactory.addUser(email, password)
            .then(function(accountData){
                vm.userData.email = vm.email;
                vm.userData.firstName = vm.firstName;
                vm.userData.surname = vm.surname;
                vm.userData.phoneNumber = vm.phoneNumber;
                vm.userData.addressStreet = vm.addressStreet;
                vm.userData.addressCity = vm.addressCity;
                vm.userData.addressCountry = vm.addressCountry;
                vm.userData.id = accountData.uid;
                FirebaseAuthFactory.storeUserData(accountData.uid, vm.userData);
                vm.toggleSignUp();
                vm.wrongEmail = false;
            }, function() {
                vm.wrongEmail = true;
            });
        }


        function authUser(email, password) {
            FirebaseAuthFactory.authUser(email, password)
            .then(function (authData) {
                FirebaseAuthFactory.getUserData(authData.uid)
                .then(function (userData) {
                    vm.userData = userData;
                    loginPanelService.updateUserData(vm.userData);
                    loginPanelService.sayHello();
                    var status = shoppingCartService.goToSummaryStatus;
                    $window.location.hash = status.status ? '#/summary' : '#/';
                    vm.wrongEmail = false;
                });
            }
            ,function() {
                vm.wrongEmail = true;
            });
        }


        function toggleSignUp () {
            vm.signUp = (!vm.signUp);
        }
         


    }


})();

