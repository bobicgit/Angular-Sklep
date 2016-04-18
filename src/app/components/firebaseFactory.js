(function () {
    'use strict';

angular
    .module("yoman")
    .factory("FirebaseFactory", FirebaseFactory);



    FirebaseFactory.$inject = ['$q','$firebaseArray'];

    function FirebaseFactory ($q, $firebaseArray) {

       
        var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items');
        var items = [];
        var cart = {};
        var user = 'Franek';
        
        var factory = {
           readBase : readBase,
           reduceAvailable: reduceAvailable,
           addToCart: addToCart,
           readCart: readCart
        }


        
        return factory;


        function readBase () {
            var deferred = $q.defer();
                ref.on("value", function(snapshot) {
                items = snapshot.val();
                deferred.resolve(items);
            },  function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }

        
        function reduceAvailable (item, amount) {

            var l = items.length;
            for ( var i = 1 ; i < l ; i++ ) {
                if ( items[i].id === item.id ) {
                    var available = items[i].available -1 ;
                    var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items/' + i); 
                    ref.update({available: available});
                    break;
                }
            }
        }


        function readCart () {
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk/');
            var deferred = $q.defer();
                ref.on("value", function(snapshot) {
                cart = snapshot.val();
                console.log(cart);
                deferred.resolve(cart);
            },  function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }


        function addToCart (item) {

            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk/');

            if (cart[item.id]) {
                cart[item.id] ++;
            } else {
            cart[item.id] = 1;
            }  
            ref.update({items: cart}); 
        }



     }   
})();