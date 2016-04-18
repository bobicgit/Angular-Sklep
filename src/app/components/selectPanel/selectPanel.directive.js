(function() {
    'use strict';

angular
    .module('yoman')
    .directive('selectPanel', selectPanel);

  
    function selectPanel() {
        var directive = {
        restrict: 'E',
        templateUrl: 'app/components/selectPanel/selectPanel.html',
        controller: SelectPanelController,
        controllerAs: 'vm',
        bindToController: true
    };


    return directive;

    SelectPanelController.$inject = ['ShoppingCart', 'FirebaseFactory'];
    
    function SelectPanelController(ShoppingCart, FirebaseFactory) {

    
        var vm = this;

        vm.allItems = [];

        vm.getItems = getItems;
          

        vm.categories = [];
        vm.filterCategory = { category : vm.category };
        vm.category = "choose category";
        vm.setCategory = setCategory;
        vm.chooseCategory = "choose category";

        vm.priceRangesMin = [0, 20, 50, 200, 500, 1000, 2000, 5000];
        vm.priceRangesMax = [20, 50, 200, 500, 1000, 2000, 5000, 10000];
        vm.priceMin = 0;
        vm.priceMax = 10000;
        vm.updatePriceMin = updatePriceMin;
        vm.updatePriceMax = updatePriceMax;

        vm.itemsOnPage = [10, 20, 30, 'all'];
        vm.itemsOnPageSelected = 10;
        vm.updateItemsOnPageAmount = updateItemsOnPageAmount;

        vm.availablePages;
        vm.pagesAmount;
        vm.updatePagesAmount = vm.updatePagesAmount;
        vm.currentPage = 1;
        vm.updatePage = updatePage;
        vm.changePagePreview = changePagePreview;
        vm.changePageNext = changePageNext;

        vm.changePictureSize = changePictureSize;
        vm.pictureSize;

        vm.addToCart = addToCart;

        vm.updateCache = updateCache;

      
        getItems();
        


        function getItems () {
          return FirebaseFactory.readBase()
          .then(function (data) { 
            vm.allItems = data; 
            updateCategoryList();
          });
        }


        function updateCategoryList () {
        //sorts data depending on its category
        // creates array with categories without repeatings
            vm.allItems.forEach(function (item) {
                if (vm.categories.includes(item.category) === false) {
                    vm.categories.push(item.category);
                } 
            });
        }


        function setCategory (category) {
            if ( category ) {
                vm.chooseCategory = category;
                vm.filterCategory = {category: category};
            } else {
                vm.chooseCategory = "choose category";
                vm.filterCategory = {};
            }
        }

        function updatePriceMin (value) {
            vm.priceMin = value;
        } 

        function updatePriceMax (value) {
            vm.priceMax = value;
        } 


        function updateItemsOnPageAmount (value) {
            vm.itemsOnPageSelected = value;
            vm.currentPage = 1;
        }


        function updatePage (value) {
            vm.currentPage = value;
        }

        function changePagePreview () {
            if (vm.currentPage > 1) {
                vm.currentPage --;
            }
        }

        function changePageNext () {
            vm.currentPage ++;
        }

        function changePictureSize (size) {
            vm.pictureSize = size;
        } 
      
        function addToCart (item, amount) {
            FirebaseFactory.reduceAvailable(item, amount);
            updateCache(item, amount);
            ShoppingCart.addToCart(item);
            ShoppingCart.sum();
            var cart = ShoppingCart.readCart();
            var summ = ShoppingCart.readSum();
        }

        function updateCache (item, amount) {
            var l = vm.allItems.length;
            for ( var i = 1 ; i < l ; i++ ) {
                if ( vm.allItems[i].id === item.id ) {
                    vm.allItems[i].available -- ;
                    break;
                }
            }
        }

  }  
 }


})();
