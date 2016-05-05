(function() {

    'use strict';

    angular
        .module('ng-shop')
        .service('cacheUserDetails', cacheUserDetails);

    cacheUserDetails.$inject = ['$q','FirebaseFactory','FirebaseAuthFactory'];

    function cacheUserDetails($q, FirebaseFactory, FirebaseAuthFactory) {

        var vm = this;

        vm.userInfo = {};
        vm.cacheUserInfo = cacheUserInfo;
        vm.readUserInfo = readUserInfo;

        function cacheUserInfo(userObj) {
            vm.userInfo = userObj;
        }

        function readUserInfo() {
            var defer = $q.defer();
            defer.resolve(vm.userInfo);
            return defer.promise;
        }

    }
})();
