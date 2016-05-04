(function() {
    'use strict';

  angular
    .module('ng-shop')
    .factory('FirebaseAuthFactory', FirebaseAuthFactory);


    function FirebaseAuthFactory($q, $timeout, loginPanelService, shoppingCartService, LocalStorageFactory, FirebaseFactory) {

        var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users');
        // ref.onAuth(checkStatus);

        var factory = {
          addUser: addUser,
          storeUserData: storeUserData,
          authUser: authUser,
          getUserData: getUserData,
          initialize: initialize,
          checkStatus:checkStatus,
          logOut: logOut,
          getAnonymousCartData: getAnonymousCartData
        }

        return factory

        initialize();

        function initialize () {
          var defer = $q.defer();

          defer.resolve(ref.onAuth(checkStatus));

          return defer.promise;
        }

        // gets info from Firebase if the user is logged or not
        // gives user data to services

        function checkStatus (data) {
          if (data) {
              shoppingCartService.setRef(data.uid);
              FirebaseFactory.cacheLoggedUserId(data.uid);
              getUserData(data.uid)
              .then(function (data) {
                      if (data.cart) {
                          var l = 0;
                          for (var i in data.cart) {
                              l++;
                          }
                          shoppingCartService.updateAmount(l);
                      } else {
                          shoppingCartService.updateAmount(0);
                      }
                      // console.log(data.customerDetails);
                  loginPanelService.updateUserData(data.customerDetails);
              });
          } else {
             var id = LocalStorageFactory.checkForAnonymousUid();
             getAnonymousCartData(id)
             .then(function (items) {
                  shoppingCartService.updateAmount(items);
             });
          }
        }

        function logOut () {
          ref.unauth();
          checkStatus();
        }

        function addUser (email, password) {
          var a = $q.defer();
          ref.createUser({
            email    : email,
            password : password
          }, function(error, userData) {
            if (error) {
              //console.log("Error creating user:", error);
               a.reject();
            } else {
              //console.log("Successfully created user account with uid:", userData.uid);
               a.resolve(userData);
            }
          });
          return a.promise;
        }

        function storeUserData (id, data) {
            ref.child(id).child('customerDetails').set(data);
            ref.child(id).child('cart').set('');
        }

        function authUser (email, password) {
          var a = $q.defer();

          ref.authWithPassword({
              email    : email,
              password : password
          }, function(error, authData) {
              if (error) {
              a.reject();
              } else {
                  shoppingCartService.setRef(authData.uid);
                  FirebaseFactory.mergeCarts();
                  $timeout(function() {ref.onAuth(checkStatus);}, 500);
              }
              a.resolve(authData);
          });
          return a.promise;
        }


        function getUserData (id) {
          var a = $q.defer();
          ref.child(id).once("value", function(snapshot) {
              var userData = snapshot.val();
              a.resolve(userData);
          });
          return a.promise;
        }

        function getAnonymousCartData (id) {
          var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/usersUnlogged/' + id + '/cart');
          var a = $q.defer();
          ref.once("value", function(snapshot) {
              var items = [];
              snapshot.forEach(function(childSnapshot) {
                  items.push(childSnapshot.val());
              })
              a.resolve(items);
          });
          return a.promise;
        }

    }

})();

