(function() {
  'use strict';

  angular
    .module('yoman')
    .factory('LocalStorageFactory', LocalStorageFactory);

    /** @ngInject */
   //

    function LocalStorageFactory ($q, loginPanelService, shoppingCartService) {

        var factory = {
            checkForAnonymousUid: checkForAnonymousUid,
            setAnonymousUid : setAnonymousUid
        };

        return factory;

       

        function checkForAnonymousUid () {
            if (localStorage.AnonymousFirebaseUid) {
                shoppingCartService.setRef(Number(localStorage.AnonymousFirebaseUid));
            } else {
                setAnonymousUid();
            }
        }

        function setAnonymousUid () {
            var uid = Math.floor((Math.random() * 10000000000000000));
            localStorage.AnonymousFirebaseUid = uid;
            shoppingCartService.setRef(uid);
        }



    }

})();




    