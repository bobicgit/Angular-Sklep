
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

    function gMapsContainerController(googleMapApiService, $scope) {

      var vm = this;

      vm.apiReady = false;

      googleMapApiService.onReady()
        .then(function() {
            vm.apiReady = true;
      })
    }
  }
})();
