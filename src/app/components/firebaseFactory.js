(function () {
    

angular
    .module("yoman")
    .factory("FirebaseFactory", FirebaseFactory);



    function FirebaseFactory ($q, shoppingCartService) {

        
        var factory = {
            getProducts : getProducts,
            readCart: readCart,
            addToCart: addToCart,
            reduceAvailable: reduceAvailable,
            removeFromCart: removeFromCart,
            makeAvailable: makeAvailable,
            removeOneFromCart: removeOneFromCart,
            getItem:getItem,
            storeComment: storeComment
        }


        return factory;


        function getProducts () {

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
                            added = true;
                        }
                    });
                    addNewToCart();
                });


                function addNewToCart () {
                    if (added === false) {
                        shoppingCartService.addOne();
                        newItem.amount = 1;
                        ref.push(newItem);
                    }
                }    
                
            }, function () {dup.reject();});

          return dup.promise;  
        }


        //updates the amount of available items in the shop

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
                        } else {
                        dupa.reject();
                        }
                    }
                });
            });
            return dupa.promise;
        }


        // removes all items from cart

        function removeFromCart (item) {

            var amount;

            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users/Maniek/koszyk/');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === item.id) { 
                        amount = childSnapshot.val().amount;
                        ref.child(childSnapshot.key()).remove();
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
                    }
                });
                makeAvailable (item, 1);
            });
        }


        // it gives back the amount of product removed from te cart

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

        // it downloads product data depending on loction hash
        // comments are put to other table for convenience


        function getItem (id) {

            var dupa = $q.defer();
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items/' + id );
            ref.once("value", function(snapshot) {
                var item = [];
                var data = {};
                var comments = [];

                snapshot.forEach(function(childSnapshot) {
                   if (childSnapshot.key() === 'comments') { 
                        childSnapshot.forEach(function(childSnapshott) {
                            comments.push(childSnapshott.val());
                        });
                    } else {
                        data[childSnapshot.key()] = childSnapshot.val();
                    }
                 });
                item.push(data);
                item.push(comments);
                dupa.resolve(item);
            });
            return dupa.promise;
        }


        function storeComment (comment, author, date, itemId) {
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items');
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === itemId) { 
                        ref.child(childSnapshot.key()).child('comments').push({comment: comment, author: author, date: date});
                    }
                });
            });
        }

        

    }    


})();


// ref.once("value", function(snapshot) {
//     snapshot.forEach(function(childSnapshot) { 
//          childSnapshot.forEach(function(cchildSnapshot) {
//             if (cchildSnapshot.key() ==='id') { 
//                        ref.child(childSnapshot.key()).update({id:childSnapshot.key()}) ;
//                     }
//                  });
//             });
//         });