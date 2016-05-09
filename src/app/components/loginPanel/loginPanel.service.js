(function () {

  angular
    .module("ng-shop")
    .service("loginPanelService", loginPanelService);

    function loginPanelService ($timeout) {

        var self = this;
        self.userData;

        self.updateUserData = updateUserData;
        self.logOut = logOut;
        self.sayHello = sayHello;

        function updateUserData (userData) {
          self.userData = userData;
        }

        function logOut () {
          self.userData = false;
          self.userData.hello = false;
        }

        function sayHello () {
          self.userData.hello = true;
          $timeout(function () {self.userData.hello = false;}, 2000);
        }
    }
})();
