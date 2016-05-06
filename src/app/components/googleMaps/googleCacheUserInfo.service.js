(function() {

    'use strict';

    angular
        .module('ng-shop')
        .service('cacheUserDetails', cacheUserDetails);

    cacheUserDetails.$inject = ['$q'];

    function cacheUserDetails($q ) {

        var vm = this;

        vm.userInfo = {};
        vm.cacheUserInfo = cacheUserInfo;
        vm.readUserInfo = readUserInfo;
        vm.cacheNewAddress = cacheNewAddress;
        vm.newAddress;

        function cacheUserInfo(userObj) {
            console.log('userObj', userObj);
            vm.userInfo = userObj;
        }

        function readUserInfo() {
            var defer = $q.defer();
            defer.resolve(vm.userInfo);
            return defer.promise;
        }

        function cacheNewAddress(newAddress) {
          vm.newAddress = newAddress;
        }

    }
})();
