(function() {
  'use strict';

angular
    .module('yoman')
    .controller('ProductDetailsController', ProductDetailsController);

  /** @ngInject */

    ProductDetailsController.$inject = ['FirebaseFactory', '$window', '$location'];

    function ProductDetailsController (FirebaseFactory, $window, $location) {


    	var vm = this;

    	vm.name;
    	vm.item;
    	vm.add = add;

    	getProduct();



    	function getProduct () {
    		name = $window.location.hash; 
    		var split = name.split('/');
    		name = split[1];

    		FirebaseFactory.getItem(name)
    		.then(function(data) { 
    			vm.item = data;
    		});
    	}

    	function add (item) {
    		FirebaseFactory.addToCart(item)
            .then(function() {
                vm.item.available --;
            });

    	}



    

   
  }


})();
