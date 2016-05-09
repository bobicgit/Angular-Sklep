(function() {

  'use strict';

  angular
    .module('ng-shop')
    .directive('personalInfo', personalInfo);

    function personalInfo() {

    return {
      restrict: "E",
      templateUrl: 'app/components/summaryPanel/personalInfoDirective/personalInfo.template.html'
    }
  }
})();
