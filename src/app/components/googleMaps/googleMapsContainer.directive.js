
(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('googleMapsContainer', googleMapsContainer);

    googleMapsContainer.$inject = ['googleMapApiService', 'cacheUserDetails'];

    function googleMapsContainer() {

    return {
      restrict: "E",
      templateUrl: 'app/components/googleMaps/templates/googleMapsContainer.template.html',
      controller: gMapsContainerController,
      controllerAs: 'gMapsCtrl'
    }

    function gMapsContainerController(googleMapApiService, cacheUserDetails, $scope) {

      var vm = this;

      $scope.$watch(function(){
          return cacheUserDetails.userInfo;
      }, function(userInfo){
          if(typeof userInfo !== 'undefined'){
            console.log(userInfo);
            vm.userInfoOK = userInfo;
          }
      });

      vm.apiReady = false;

      googleMapApiService.onReady()
        .then(function() {
            vm.apiReady = true;
      })

    }
  }
})();
