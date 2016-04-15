(function() {
    'use strict';

angular
    .module('yoman')
    .controller('ShoppingCartController', ShoppingCartController);

  

    ShoppingCartController.$inject = ['ShoppingCart'];

    function ShoppingCartController(ShoppingCart) {

        var vm = this;
        vm.sum;
    

        vm.cartItems =  [{ id: 3,  category: "rtv",       name: "myszka",   price : 55 , count: 7, url: "http://img.cda.pl/obr/oryginalne/94a93000173e08a43ab806abcc4687c1.jpg"},
            { id: 4,  category: "warzywa",   name: "marchew",  price : 3.5, count: 8, url: "http://naturalneoczyszczanie.pl/wp-content/uploads/2011/06/marchewka.jpg"},
            { id: 5,  category: "słodycze",  name: "wafelki",  price : 2.8, count: 4, url: "http://swpanel.pl/userfiles/user_65525/images/427_Neap%202004%20solo.jpg"},
            { id: 6,  category: "owoce",     name: "truskawki",price : 8,   count: 3, url: "https://bialczynski.files.wordpress.com/2013/06/aa-12529377small_strawberry__95536.jpg"}]

        cartItems();



        function cartItems() {
            vm.cartItems = ShoppingCart.readCart();
            vm.sum = ShoppingCart.readSum();
        }
    }


})();
