(function() {
    'use strict';

angular
    .module('ng-shop')
    .directive('logo', logo);


    function logo() {
        var directive = {
            restrict: 'E',
            template: '<br/><br/><h1 style="color:#8F9294;text-align: right; cursor:default;"><b>ng-shop</b></h1><p class="lead" style="text-align: right; color:#73777A; cursor: default;">Always a pleasure serving Angular.js.</p><br/><br/>'
        };

        return directive;
       
    }

})();
