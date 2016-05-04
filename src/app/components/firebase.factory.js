(function () {
    'use strict';

angular
    .module("ng-shop")
    .factory("FirebaseFactory", FirebaseFactory);



    function FirebaseFactory ($q, shoppingCartService) {

        var itemsRef = new Firebase('https://boiling-heat-8208.firebaseio.com/items');

        var userRef = shoppingCartService.ref,
            userId;

        var factory = {
            getProducts : getProducts,
            readCart: readCart,
            addToCart: addToCart,
            reduceAvailable: reduceAvailable,
            removeFromCart: removeFromCart,
            makeAvailable: makeAvailable,
            removeOneFromCart: removeOneFromCart,
            getItem:getItem,
            storeComment: storeComment,
            mergeCarts: mergeCarts,
            cacheLoggedUserId : cacheLoggedUserId,
            readLoggedUserId: readLoggedUserId
        }


        return factory;

        function cacheLoggedUserId(id) {
          userId = id;
        }

        function readLoggedUserId() {
          return userId;
        }

        function getProducts () {

            var items;

            var a = $q.defer();
            itemsRef.once("value", function(snapshot) {
                items = [];
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    items.push(item);
                });
                a.resolve(items);
            });
            return a.promise;
        }


        function readCart () {
            var cart;
            var ref = new Firebase(userRef.userRef);
            var a = $q.defer();
            ref.once("value", function(snapshot) {
                cart = [];
                snapshot.forEach(function(childSnapshot) {
                    var item = childSnapshot.val();
                    cart.push(item);
                });
                a.resolve(cart);
            });
            return a.promise;
        }


        function addToCart (item) {

            var a = $q.defer();
            var added = false;

            reduceAvailable(item)
            .then(function (item) {

                a.resolve(item);

                var newItem = {};
                newItem.id = item.id;
                newItem.name = item.name;
                newItem.available = item.available;
                newItem.count = item.count;
                newItem.price = item.price;
                newItem.url = item.url;
                newItem.category = item.category;

                var ref = new Firebase(userRef.userRef);
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

            }, function () {a.reject();});

          return a.promise;
        }


        //updates the amount of available items in the shop

        function reduceAvailable (item) {

            var a = $q.defer();
            itemsRef.child(item.id).once("value", function(snapshot) {
                if (snapshot.val().available > 0 ) {
                    var newAmount = snapshot.val().available - 1;
                    itemsRef.child(snapshot.key()).update({available: newAmount});
                    a.resolve(item);
                } else {
                a.reject();
                }
            });
            return a.promise;
        }


        // removes all items from cart

        function removeFromCart (item) {

            var amount;

            var ref = new Firebase(userRef.userRef);
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

            var ref = new Firebase(userRef.userRef);
            ref.once("value", function(snapshot) {debugger;
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

          //  console.log(item);
          //  console.log(amount);

            itemsRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().id === item.id) {
                        var newAvailable = childSnapshot.val().available + amount;
                        itemsRef.child(childSnapshot.key()).update({available: newAvailable});
                    }
                });
            });
        }

        // it downloads product data depending on loction hash
        // comments are put to other table for convenience


        function getItem (id) {

            var a = $q.defer();
            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items/' + id);
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
                a.resolve(item);
            });
            return a.promise;
        }


        function storeComment (id, comment, author, date) {

            var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/items/' + id);
            ref.child('comments').push({comment: comment, author: author, date: date});
        }



        // used when the unlogged user had put something into cart
        // then the product that are already on his account are removed
        // when the cart of unlogged user is empty,
        // products on his account stay


        function mergeCarts () {



            if (localStorage.AnonymousFirebaseUid) {
                getProductsFromAnonymousUser()
                .then(function (items) {
                    if (items.length > 0) {
                        emptyCart()
                        .then(function () {
                            var ref = new Firebase(userRef.userRef);
                            items.forEach(function(item){
                                ref.push(item);
                            });
                            shoppingCartService.updateAmount(items.length);

                        });

                    }

                });
            }

            function getProductsFromAnonymousUser () {
                var a = $q.defer();
                var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/usersUnlogged/' + localStorage.AnonymousFirebaseUid +'/cart');
                    ref.once("value", function(snapshot) {
                    var items = [];
                    snapshot.forEach(function(childSnapshot) {
                        items.push(childSnapshot.val());
                    });
                    ref.remove();
                    a.resolve(items);
                });
                return a.promise;
            }

        }

        function emptyCart () {
            var a = $q.defer();
            var ref = new Firebase(userRef.userRef);
            ref.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    removeFromCart(childSnapshot.val());
                });
                a.resolve();
            });
            return a.promise;
        }

    }


})();
