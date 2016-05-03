(function() {
  'use strict';

angular
    .module('ng-shop')
    .filter('priceFilter', priceFilter);



    function priceFilter () {

        return function (allItems, minValue, maxValue) {

            var items = [];

            allItems.forEach(function (item) {
                if (item.price > minValue && item.price < maxValue) {
                    items.push(item);
                }
            });

        return items;
        }
     }

})();




