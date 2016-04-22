(function () {
    

angular
    .module("yoman")
    .service("shoppingCartService", shoppingCartService);



    function shoppingCartService () {

        var self = this;

        self.cart = {
            itemsAmount: 0
        };
    
        self.updateAmount = updateAmount;
        self.addOne = addOne;

        function updateAmount (items) {
            self.cart.itemsAmount = items.length;
        }

        function addOne () {
            self.cart.itemsAmount ++;
            console.log(self.cart.itemsAmount);
        }


    }    


})();
