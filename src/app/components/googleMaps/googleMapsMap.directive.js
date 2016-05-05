(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('gMap', gMap);

    gMap.$inject = ['$window','googleMapLocationService', 'cacheUserDetails'];

    function gMap($window, googleMapLocationService, cacheUserDetails) {

      return {
        restrict: "E",
        scope: {
          apiready: "="
        },
        require: '^googleMapsContainer',
        template: '<div id="map"></div>',
        link: function(scope, element, attributes, googleMapsContainer) {

        scope.$watch('apiready', initMap, true);

        function initMap() {
          googleMapLocationService
            .geocodeAddress()
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
              //     storageMarker = new google.maps.Marker({
              //       position:storagePoint,
              //       icon:'assets/images/storage.png'
              //       });
              // storageMarker.setMap(map);

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
