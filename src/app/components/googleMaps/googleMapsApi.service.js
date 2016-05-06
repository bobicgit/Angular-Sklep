/*eslint angular/document-service: 1*/

(function() {

    'use strict';

    angular
        .module('ng-shop')
        .service('googleMapApiService', googleMapApiService);

    googleMapApiService.$inject = ['$q', '$window'];

    function googleMapApiService($q, $window) {
        var apiReady = $q.defer();

        activate();

        this.onReady = onReady;

        function onReady() {
            return apiReady.promise;
        }

        function activate() {
            var tag = document.createElement('script');
            tag.src = "https://maps.googleapis.com/maps/api/js?callback=init";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            $window.init = apiReady.resolve;
        }
    }
})();
