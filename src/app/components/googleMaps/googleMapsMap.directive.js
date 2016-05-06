/*eslint angular/document-service: 1*/
(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('gMap', gMap);

    gMap.$inject = ['$window','googleMapLocationService','FirebaseAuthFactory','FirebaseFactory','cacheUserDetails'];

    function gMap($window, googleMapLocationService, FirebaseAuthFactory, FirebaseFactory,cacheUserDetails) {

      return {
        restrict: "E",
        template: '<div id="map"></div>',

        link: function(scope, elem, attrs) {

          var address  = '';

          // initialize();

          attrs.$observe('address', initMap)

          // function initialize() {

          //   FirebaseAuthFactory.initialize()
          //     .then(function() {
          //       var userId = FirebaseFactory.readLoggedUserId();
          //       return userId;
          //     })
          //     .then(function(userId) {
          //       return FirebaseAuthFactory.getUserData(userId);
          //     })
          //     .then(function(userInfofromDB) {
          //       var userInfo = userInfofromDB.customerDetails;
          //       address = userInfo.addressCountry + ' ' + userInfo.addressCity + ' ' + userInfo.addressStreet;
          //       console.log(address);
          //       return address;
          //     })
          //     .then(function(address) {
          //       initMap(address);
          //     })
          // }

          function initMap(address) {
            googleMapLocationService
              .geocodeAddress(address)
              .then(function(destinationLocation) {
                var storagePoint = new google.maps.LatLng(googleMapLocationService.storageLocation.lat, googleMapLocationService.storageLocation.lng),
                    destinationPoint = new google.maps.LatLng(destinationLocation.lat, destinationLocation.lng),
                    mapOptions = {
                      zoom: 10,
                      center: storagePoint
                    },
                    map = new google.maps.Map(document.getElementById("map"), mapOptions),
                    directionsService = new google.maps.DirectionsService,
                    directionsDisplay = new google.maps.DirectionsRenderer({
                      map: map
                    });
                calculateAndDisplayRoute(directionsService,directionsDisplay, storagePoint, destinationPoint);
              });
          }

          function calculateAndDisplayRoute(directionsService, directionsDisplay, storagePoint, destinationPoint) {
            directionsService.route({
                origin: storagePoint,
                destination: destinationPoint,
                avoidTolls: true,
                avoidHighways: false,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
          }
        }
      };
    }
})();
