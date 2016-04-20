(function () {
    

angular
    .module("yoman")
    .factory("FirebaseFactory", FirebaseFactory);


    function FirebaseFactory ($q) {

        
        var factory = {
            getProduct : getProduct,
            readCart: readCart,
            addToCart: addToCart,
            reduceAvailable: reduceAvailable,
            removeFromCart: removeFromCart,
            makeAvailable: makeAvailable,
            removeOneFromCart: removeOneFromCart
        }


        return factory;


        function getProduct () {

            var items;
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items');
            var deferred = $q.defer();
            ref.once("value", function(snapshot) {
                items = [];
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    items.push(item);
                });
                deferred.resolve(items);
            },  function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }

        function readCart () {
            var cart;
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk');
            var deferred = $q.defer();
            ref.once("value", function(snapshot) {
                cart = [];
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    cart.push(item);
                });
                deferred.resolve(cart);
            },  function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }


        function addToCart (item) {

            var dup = $q.defer();
            var added = false;

            reduceAvailable(item)
            .then(function (item) {

                dup.resolve(item);

                var newItem = {};
                newItem.id = item.id;
                newItem.name = item.name;
                newItem.available = item.available;
                newItem.count = item.count;
                newItem.price = item.price;
                newItem.url = item.url;
                newItem.category = item.category;

                var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk/');
                ref.once("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.val().id === newItem.id) { 
                            var newAmount = childSnapshot.val().amount + 1;
                            ref.child(childSnapshot.key()).update({amount: newAmount});
                            console.log('zwiększono ilość w koszyku');
                            added = true;
                        }
                    });
                    addNewToCart();
                });


                function addNewToCart () {
                    if (added === false) {
                        newItem.amount = 1;
                        console.log('dodano nowy do koszyka');
                        ref.push(newItem);
                    }
                }    
                
            });

          return dup.promise;  
        }


        function reduceAvailable (item) {

            var dupa = $q.defer();
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === item.id) { 
                        if (childSnapshot.val().available > 0 ) {
                            var newAvailable = childSnapshot.val().available - 1;
                            ref.child(childSnapshot.key()).update({available: newAvailable});
                            dupa.resolve(item);
                        }
                    }
                });
            });
            return dupa.promise;
        }


        function removeFromCart (item) {

            var amount;

            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === item.id) { 
                        amount = childSnapshot.val().amount;
                        ref.child(childSnapshot.key()).remove();
                        console.log('usunięto z koszyka');
                    }
                });
                makeAvailable (item, amount);
            });
        }


        function removeOneFromCart (item) {

            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === item.id) { 
                        var newAmount = childSnapshot.val().amount -1 ;
                        ref.child(childSnapshot.key()).update({amount: newAmount});
                        console.log('usunięto z koszyka');
                    }
                });
                makeAvailable (item, 1);
            });
        }


        function makeAvailable (item, amount) {
            
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === item.id) { 
                        var newAvailable = childSnapshot.val().available + amount;
                        ref.child(childSnapshot.key()).update({available: newAvailable});
                    }
                });
            });
        }

        

    }    


})();
