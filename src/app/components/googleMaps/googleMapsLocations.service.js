(function() {

    'use strict';

    angular
        .module('ng-shop')
        .service('googleMapLocationService', googleMapLocationService);

    googleMapLocationService.$inject = [ '$q','FirebaseFactory','FirebaseAuthFactory','cacheUserDetails'];

    function googleMapLocationService( $q, FirebaseFactory, FirebaseAuthFactory, cacheUserDetails) {

        var vm = this,
            geocoder = new google.maps.Geocoder(),
            userAddress;

        vm.destinationLocation = {};
        vm.storageLocation = {
            lat : 53.443217,
            lng : 14.7367003
        };
        vm.geocodeAddress = geocodeAddress;


        function geocodeAddress() {
            var defer = $q.defer();
                    var userInfo = cacheUserDetails.userInfo;
                    var address = userInfo.addressCountry + ' ' + userInfo.addressCity + ' ' + userInfo.addressStreet;
                    geocoder.geocode({'address': address}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        vm.destinationLocation['lat'] = results[0].geometry.location.lat();
                        vm.destinationLocation['lng'] = results[0].geometry.location.lng();
                        defer.resolve(vm.destinationLocation);
                    } else {
                      defer.reject(status);
                    }
                  });

            return defer.promise;
        }
    }
})();
