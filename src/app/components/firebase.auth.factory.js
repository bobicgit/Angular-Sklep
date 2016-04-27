(function() {
  'use strict';

  angular
    .module('yoman')
    .factory('FirebaseAuthFactory', FirebaseAuthFactory);

    /** @ngInject */
   //

    function FirebaseAuthFactory($q, loginPanelService, shoppingCartService, LocalStorageFactory, FirebaseFactory) {

        

        var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/users');
        ref.onAuth(checkStatus);

        var factory = {
            addUser: addUser,
            storeUserData: storeUserData,
            authUser: authUser,
            getUserData: getUserData,
            initialize: initialize,
            checkStatus:checkStatus,
            logOut: logOut
            //,logAnonymous: logAnonymous
        }

        return factory



        function initialize () {
            ref.onAuth(checkStatus);
        }

        function checkStatus (data) {
            if (data) {
                shoppingCartService.setRef(data.uid);
                getUserData(data.uid)
                .then(function (data) {
                    loginPanelService.updateUserData(data);
                });
            } else {
               LocalStorageFactory.checkForAnonymousUid();
            }
        }

        function logOut () {
            ref.unauth();
            LocalStorageFactory.checkForAnonymousUid();
        }

        // function logAnonymous () {
        //     var ref = new Firebase('https://boiling-heat-8208.firebaseio.com/');
        //     ref.authAnonymously(function(error, authData) {
        //       if (error) {
        //         console.log("Login Failed!", error);
        //       } else {
        //         console.log("Authenticated successfully with payload:", authData);
        //       }
        // });
        // }

        



        function addUser (email, password) {
            var dup = $q.defer();
            ref.createUser({
              email    : email,
              password : password
            }, function(error, userData) {
              if (error) {
                console.log("Error creating user:", error);
              } else {
                console.log("Successfully created user account with uid:", userData.uid);
              }
              dup.resolve(userData);
            });
        return dup.promise;
        }

        function storeUserData (id, data) {
            
            ref.child(id).child('customerDetails').set(data);
            ref.child(id).child('cart').set('');
        }


        function authUser (email, password) {
            var dup = $q.defer();
            console.log(email);
            console.log(password);
            
            ref.authWithPassword({
              email    : email,
              password : password
            }, function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                shoppingCartService.setRef(authData.uid);
                FirebaseFactory.mergeCarts();
                console.log(authData.uid);
                //console.log("Authenticated successfully with payload:", authData);
              }
               dup.resolve(authData);
            });
        return dup.promise;
        }

        function getUserData (id) {
            var dup = $q.defer();
            
             ref.child(id).once("value", function(snapshot) {
                var userData = snapshot.val();
                dup.resolve(userData);
            });
           return dup.promise; 
        }




    }

})();

















    // //var auth = $firebaseAuth(new Firebase('https://boiling-heat-8208.firebaseio.com/users'));


    // //Initialize FirebaseAuth
    //   var factory = {
    //     addUser: addUser,
    //     authUser: authUser,
    //     auth: auth,
    //     newDatabase: newDatabase

    // };

   

    // return factory;

    // // Create user account

    //     function addUser(email, password) {

    //         return auth.$createUser({
    //             email    : email,
    //             password : password
    //         });
    //     };

    // //User authentication

    //     function authUser(email, password) {

    //         return auth.$authWithPassword({
    //             email    : email,
    //             password : password
    //         });
    //     };


    //     function newDatabase () {
    //         var myDataRef = new Firebase(FBMSG);
    //         return myDataRef;
    //     }


    //     function auth() {
    //         return auth;
    //     };

    // };





// function signUp(){


//         FirebaseAuthFactory.addUser(vm.email, vm.password);
//         result.then(function(userData){
//             console.log(userData);
//             console.log("Successfully created user account with uid:", userData.uid);
//             firebaseRef.child(userData.uid).set({
//                 email:vm.email,
//                 name: vm.name,
//                 points: vm.points
//             });


//         }, function(error) {
//             console.log("Error creating user:", error);
//         })
//     }

    