(function() {
    'use strict';

  angular
    .module('ng-shop')
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

    SelectPanelController.$inject = ['FirebaseFactory', 'shoppingCartService'];
    
    function SelectPanelController($scope, $window, $timeout, FirebaseFactory, shoppingCartService) {

      // "sp.creationDate" is available by directive option "bindToController: true"
        var vm = this;

        
        vm.selectClass = '';
        $window.onscroll = function() {
            $scope.$apply(function () {
                if ($window.pageYOffset > 294) {
                    vm.selectClass = 'select-panel-fixed';
                } else {
                    vm.selectClass = '';
                }
            }) 
        }


        vm.allItems = [];
        vm.itemsFiltered = vm.allItems;

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
        vm.itemsOnPageSelected = 30;
        vm.updateItemsOnPageAmount = updateItemsOnPageAmount;

        vm.availablePages;
        vm.pagesAmount;
        vm.updatePagesAmount = vm.updatePagesAmount;
        vm.currentPage = 1;
        vm.updatePage = updatePage;
        vm.changePagePreview = changePagePreview;
        vm.changePageNext = changePageNext;

        vm.changePictureSize = changePictureSize;
        vm.pictureSize = 'small';

        vm.filterItems = filterItems;

        vm.addToCart = addToCart;

        vm.active = true;

      
   
        initialize();


        // downloads products data from database and updates cart counter

        function initialize () {
            FirebaseFactory.getProducts()
            .then(function (data) { 
                vm.allItems = data; 
                vm.itemsFiltered = data;
                updateCategoryList();
            });
            
            FirebaseFactory.readCart()
            .then(function(data) {
                shoppingCartService.updateAmount(data);
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
            vm.currentPage = 1;
        }

        function updatePriceMin (value) {
            vm.priceMin = value;
            vm.currentPage = 1;
        } 

        function updatePriceMax (value) {
            vm.priceMax = value;
            vm.currentPage = 1;
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
        


        // it filters items on query given in text input

        function filterItems () {  

            if (vm.findItem === "") { 
                vm.itemsFiltered = vm.allItems; 
            } else {
                vm.itemsFiltered = [];
                var regex = new RegExp( vm.findItem, "g");

                for ( var i = 0 ; i < vm.allItems.length ; i ++ ) {
                    if( regex.test(vm.allItems[i].name) ) {
                        vm.itemsFiltered.push(vm.allItems[i]);
                    }
                }
            }
            vm.currentPage = 1;
        }


        // adding product to the cart
        // vm.active is a flag which ensure that only one request can be sended at the time

        function addToCart (item) {
            if (vm.active) {
                vm.active = false;
                
                FirebaseFactory.addToCart(item)
                .then(function() {
                    vm.allItems.forEach(function(cacheItem) {
                        item.animate = true;
                        $timeout(function() {item.animate = false}, 1000);
                        if (cacheItem.id === item.id) {
                            cacheItem.available --;
                        }
                        vm.active = true;
                    });
                }, function () {vm.active = true});
            }
        } 


    }  
}


})();
