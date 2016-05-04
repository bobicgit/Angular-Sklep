(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('personalInfo', personalInfo);

    //personalInfo.$inject = ['YT_event','cachingFactory','toastr'];

    function personalInfo() {

    return {
      restrict: "E",
      templateUrl: 'app/components/summaryPanel/personalInfoDirective/personalInfo.template.html'
    }
  }
})();
