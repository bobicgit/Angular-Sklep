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
            readSum : readSum
        }

        return factory;
        

        function cart () {
            cart = [];
        }

        function readCart () {
            return cart;
        }

        function addToCart (item) {
            cart.push(item);
        }

        function sum () {
            cartSum = 0;
            cart.forEach(function(item) {
                cartSum += item.price;
            });
        }

        function readSum () {
            return cartSum;
        }

    }    


})();



 