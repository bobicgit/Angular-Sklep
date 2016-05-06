
(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('googleMapsContainer', googleMapsContainer);

    // googleMapsContainer.$inject = ['googleMapApiService', 'cacheUserDetails','$scope'];

    function googleMapsContainer() {

    return {
      restrict: "E",
      templateUrl: 'app/components/googleMaps/templates/googleMapsContainer.template.html',
      scope: {
        address: '@'
      },
      controller: gMapsContainerController,
      controllerAs: 'gMapsCtrl'
    }

    function gMapsContainerController(googleMapApiService, cacheUserDetails, $scope) {

      var vm = this;

      // vm.address = $scope.address;

      vm.apiReady = false;

      googleMapApiService.onReady()
        .then(function() {
            vm.apiReady = true;
      })

    }
  }
})();
