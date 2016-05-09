/*eslint angular/document-service: 1*/
(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('gMap', gMap);

    gMap.$inject = ['$window','googleMapLocationService'];

    function gMap($window, googleMapLocationService) {

      return {
        restrict: "E",
        template: '<div id="map"></div>',
        require: "^googleMapsContainer",
        link: function(scope, elem, attrs, gmapContainer) {

          attrs.$observe('address', initMap)

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
              //console.log(response.routes[0].legs[0].distance.text);
                if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                  scope.$emit('distance', response.routes[0].legs[0].distance.text);
                  //gmapContainer.distance = response.routes[0].legs[0].distance.text;
                }
            });
          }
        }
      };
    }
})();
