(function () {
    

angular
    .module("yoman")
    .service("shoppingCartService", shoppingCartService);



    function shoppingCartService () {

        var self = this;

        self.itemsInCart = 0;
        self.updateAmount = updateAmount;
        self.getAmount = getAmount;
        self.addOne = addOne;

        function updateAmount (items) {
            self.itemsInCart = items.length; 
        }

        function getAmount () {
            return self.itemsInCart;
        }

        function addOne () {
            self.itemsInCart ++;
        }


    }    


})();
