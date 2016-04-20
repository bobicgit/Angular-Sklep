(function () {
    'use strict';

angular
    .module("yoman")
    .factory("ShoppingCart", ShoppingCart);

    ShoppingCart.$inject = ['$q','FirebaseFactory'];

    function ShoppingCart ($q, FirebaseFactory) {

        var cart = [];
        
        var cartSum = 0;

        var factory = {
            // cart: cart,
            readCart: readCart,
            addToCart: addToCart
            // sum: sum,
            // readSum : readSum,
            // remove : remove,
            // add: add,
            // removeOneItem: removeOneItem
        }

        return factory;
        


        function readCart () {
             return FirebaseFactory.readCart().then(function(data){
                cart = data;
            });
        }


        function addToCart (item) {
            FirebaseFactory.addToCart(item);
        }


        // function sum () {
        //     cartSum = 0;
        //     cart.forEach(function(item) {
        //         cartSum += item.price * item.amount;
        //     });
        // }

        // function readSum () {
        //     return cartSum;
        // }


        // function remove (item) {
        //     FirebaseFactory.remove(item).then(function(){
        //         read.Cart
        //     });
        // }

        // function add (item, amount) {
        //     var l = cart.length;
        //     for (var i = 0 ; i < l ; i ++ ) {
        //         if (cart[i].id === item.id) {
        //             if (cart[i].amount < item.count) {
        //                 cart[i].amount += 1;
        //             }
        //             return;
        //         }
        //     }
        // }

        // function removeOneItem (item) {
        //     if (item.amount > 1) {
        //         var l = cart.length;
        //         for (var i = 0 ; i < l ; i ++ ) {
        //             if (cart[i].id === item.id) {
        //                 cart[i].amount -= 1;
        //                 return;
        //             }
        //         }
        //     }
        // }



     }   
})();



 