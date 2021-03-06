(function() {
  'use strict';

  angular
    .module('ng-shop')
    .filter('paginationFilter', paginationFilter);



    function paginationFilter () {


        return function (allItems, itemsOnPage, pageNumber) {

            if ( angular.isString(itemsOnPage)) {
                return allItems;
            } else {

                var items = [];
                var downLimit;
                var upLimit;

          
                upLimit = itemsOnPage * pageNumber;
                downLimit = upLimit - itemsOnPage + 1;

                for ( var i = downLimit - 1 ; i < upLimit ; i ++ ) {
                    if (allItems[i]) {
                        items.push(allItems[i]);
                    }
                }

            return items;
            }
        }
    }

})();