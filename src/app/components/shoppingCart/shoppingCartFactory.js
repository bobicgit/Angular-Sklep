(function () {
    'use strict';

angular
    .module("yoman")
    .factory("ShoppingCart", ShoppingCart);


    function ShoppingCart () {

        var cart = [];
        
        var cartSum = 0;

        var factory = {
            cart: cart,
            readCart: readCart,
            addToCart: addToCart,
            sum: sum,
            readSum : readSum,
            remove : remove
        }

        return factory;
        

        function cart () {
            cart = [];
        }

        function readCart () {
            return cart;
        }

        function addToCart (item) {

            var added = false;

            cart.forEach(function (cartItem) {
                if (cartItem.id === item.id) {
                    cartItem.amount += 1;
                    console.log(cart);
                    added = true;
                    return;
                } 
            });

            if (!added) {
                item.amount = 1;
                cart.push(item);
                console.log(cart);
            }
        }


        function sum () {
            cartSum = 0;
            cart.forEach(function(item) {
                cartSum += item.price * item.amount;
            });
        }

        function readSum () {
            return cartSum;
        }


        function remove (item) {
            var l = cart.length;
            for (var i = 0 ; i < l ; i ++ ) {
                if (cart[i].id === item.id) {
                    cart.splice(i, 1);
                    return;
                }
            }
        }



     }   
})();



 