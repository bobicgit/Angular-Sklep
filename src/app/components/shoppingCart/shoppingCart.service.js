(function () {
    

angular
    .module("yoman")
    .service("shoppingCartService", shoppingCartService);



    function shoppingCartService () {

        var self = this;

        self.ref = {
            userRef :''
        }

        self.cart = {
            itemsAmount: 0
        };

        self.status = {
            logged : false
        }


    
        self.updateAmount = updateAmount;
        self.addOne = addOne;
        self.setRef = setRef;


        function setRef(ref) {
            if (angular.isString(ref)) {
            self.ref.userRef = 'https://boiling-heat-8208.firebaseio.com/users/' + ref + '/cart';
            self.status.logged = true;
            console.log(self.ref.userRef);
            } else {
            self.ref.userRef = 'https://boiling-heat-8208.firebaseio.com/usersUnlogged/' + ref +'/cart'; 
            self.status.logged = false;  
            console.log(self.ref.userRef); 
            }
        }

        function updateAmount (items) {
            self.cart.itemsAmount = items.length;
        }

        function addOne () {
            self.cart.itemsAmount ++;
        }


    }    


})();
