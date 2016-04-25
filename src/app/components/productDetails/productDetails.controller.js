(function() {
  'use strict';

angular
    .module('yoman')
    .controller('ProductDetailsController', ProductDetailsController);

  

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

        vm.active = true;


        getProduct();


        // downloading data from database depending on hash location which conatains product's id
        // comments are put to other table for convenience

        function getProduct () {
            vm.id = $window.location.hash; 
            var split = vm.id.split('/');
            vm.id = split[1];

            FirebaseFactory.getItem(vm.id)
            .then(function(data) {
                vm.item = data[0];
                vm.comments = data[1];
            });
        }


        // adding product to the cart
        // vm.active is a flag which ensure that only one request can be sended at the time

        function add (item) {
            if (vm.active) {
                vm.active = false;

                FirebaseFactory.addToCart(item)
                .then(function() {
                    vm.item.animate = true;
                    $timeout(function() {vm.item.animate = false}, 1000);
                    vm.item.available --;
                    vm.active = true;
                },
                function () {vm.active = true});
            }
        }


        // flag-like function to show/hide comment input field

        function showCommentInput () {
            vm.inputActive = (!vm.inputActive);
        }


        // stores new comment and sends it to the database 

        function sendComment () {

            var date = new Date().toLocaleString();
            var comment = vm.comment;
            var author = vm.commentAuthor;
            var newComment = {};
            
            vm.comment = '';
            vm.commentAuthor = '';

            vm.inputActive = false;

            FirebaseFactory.storeComment(comment, author, date, vm.id);
            newComment = {comment:comment, author:author, date:date};
            vm.comments.push(newComment);
        }



    

   
  }


})();
