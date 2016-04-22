(function() {
  'use strict';

angular
    .module('yoman')
    .controller('ProductDetailsController', ProductDetailsController);

  /** @ngInject */

    ProductDetailsController.$inject = ['FirebaseFactory', '$window', '$location', '$timeout'];

    function ProductDetailsController (FirebaseFactory, $window, $location, $timeout) {


    	var vm = this;

    	vm.name;
    	vm.item;
        vm.inputActive = false;
    	vm.add = add;
        vm.showCommentInput = showCommentInput;
        vm.sendComment = sendComment;
        vm.comments;


    	getProduct();



    	function getProduct () {
    		vm.name = $window.location.hash; 
    		var split = vm.name.split('/');
    		vm.name = split[1];

    		FirebaseFactory.getItem(vm.name)
    		.then(function(data) {
    			vm.item = data[0];
                vm.comments = data[1];
                console.log(vm.comments);
                //console.log(data.comments);
                // for (var comment in data.comments) {
                //     console.log(comment);
                // }
    		});
    	}

    	function add (item) {
    		FirebaseFactory.addToCart(item)
            .then(function() {
                vm.item.animate = true;
                $timeout(function() {vm.item.animate = false}, 1000);
                vm.item.available --;
            });

    	}

        function showCommentInput () {
            vm.inputActive = (!vm.inputActive);
        }

        function sendComment () {

            var date = new Date().toLocaleString();
            var comment = vm.comment;
            var author = vm.commentAuthor;
            var newComment = {};
            
            vm.comment = '';
            vm.commentAuthor = '';

            vm.inputActive = false;

            FirebaseFactory.storeComment(comment, author, date, vm.name);
            var newComment = {comment:comment, author:author, date:date};
            vm.comments.push(newComment);
        }



    

   
  }


})();
