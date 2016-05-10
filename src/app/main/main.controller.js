(function() {
    'use strict';

angular
    .module('ng-shop')
    .controller('MainController', MainController);


    MainController.$inject = ['FirebaseAuthFactory'];

    function MainController(FirebaseAuthFactory) {


        initialize();

        function initialize() {
            FirebaseAuthFactory.checkStatusOfLog();
        }
    }

})();
