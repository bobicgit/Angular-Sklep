(function () {
    

angular
    .module("ng-shop")
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

        self.goToSummaryStatus = {
            status : false
        }


    
        self.updateAmount = updateAmount;
        self.addOne = addOne;
        self.setRef = setRef;
        self.goToSummary = goToSummary;



        function setRef(ref) {
            if (angular.isString(ref)) {
            self.ref.userRef = 'https://boiling-heat-8208.firebaseio.com/users/' + ref + '/cart';
            self.status.logged = true;
            } else {
            self.ref.userRef = 'https://boiling-heat-8208.firebaseio.com/usersUnlogged/' + ref +'/cart'; 
            self.status.logged = false;   
            }
        }


        function updateAmount (items) {
            if (angular.isNumber(items)) {
                self.cart.itemsAmount = items;
            } else {
                self.cart.itemsAmount = items.length;
            }
        }


        function addOne () {
            self.cart.itemsAmount ++;
        }
        

        function goToSummary (status) {
            self.goToSummaryStatus.status = status;
        }
      

    }    


})();
