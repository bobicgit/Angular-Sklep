(function() {
  'use strict';

  angular
    .module('yoman')
    .factory('FirebaseAuthFactory', FirebaseAuthFactory);

    /** @ngInject */
    FirebaseAuthFactory.$inject = [$firebaseAuth];

    function FirebaseAuthFactory($firebaseAuth) {

    var auth = $firebaseAuth(new Firebase('https://boiling-heat-8208.firebaseio.com/users'));


    //Initialize FirebaseAuth
      var factory = {
        addUser: addUser,
        authUser: authUser,
        auth: auth,
        newDatabase: newDatabase

    };

   

    return factory;

    // Create user account

        function addUser(email, password) {

            return auth.$createUser({
                email    : email,
                password : password
            });
        };

    //User authentication

        function authUser(email, password) {

            return auth.$authWithPassword({
                email    : email,
                password : password
            });
        };


        function newDatabase () {
            var myDataRef = new Firebase(FBMSG);
            return myDataRef;
        }


        function auth() {
            return auth;
        };

    };

})();



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

    