 (function() {
  'use strict';

     angular
        .module('yoman')
        .filter('pagesAmountFilter', pagesAmountFilter);



        function pagesAmountFilter () {


            return function (availablePages, allItems, itemsOnPage) {

                var pages = [];
                var pagesAmount;

                if ( angular.isString(itemsOnPage)) {
                    pages.push(1);
                    return pages;
                } else {

                    
                    
                    pagesAmount = Math.ceil(allItems.length / itemsOnPage);

                    for ( var i = 1 ; i <= pagesAmount ; i ++ ) {
                        pages.push(i);
                    }
                    return pages;
                    }
                }    
         }

})();