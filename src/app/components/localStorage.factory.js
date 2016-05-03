(function() {
    'use strict';

angular
    .module('ng-shop')
    .factory('LocalStorageFactory', LocalStorageFactory);


    function LocalStorageFactory ($q, loginPanelService, shoppingCartService) {

        var factory = {
            checkForAnonymousUid: checkForAnonymousUid
        };

        return factory;

       
        function checkForAnonymousUid () {
            if (localStorage.AnonymousFirebaseUid) {
                shoppingCartService.setRef(Number(localStorage.AnonymousFirebaseUid));
                return localStorage.AnonymousFirebaseUid
            } else {
                var uid = Math.floor((Math.random() * 10000000000000000));
                localStorage.AnonymousFirebaseUid = uid;
                shoppingCartService.setRef(uid);
                return uid;
            }
        }

    }

})();




    