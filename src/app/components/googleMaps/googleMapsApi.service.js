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

            // var secTag = document.createElement('script');
            // secTag.src = "http://www.geoplugin.net/javascript.gp";
            // var secondScriptTag = document.getElementsByTagName('script')[0];
            // secondScriptTag.parentNode.insertBefore(secTag, secondScriptTag);

             $window.init = apiReady.resolve;
        }
    }
})();
