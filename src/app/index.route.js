(function() {
  'use strict';

  angular
    .module('yoman')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/cart', {
        templateUrl: 'app/components/shoppingCart/shoppingCart.html',
        controller: 'ShoppingCartController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'app/components/loginPanel/loginPanel.html',
        controller: 'LoginPanelController',
        controllerAs: 'vm'
      })
      .when('/:id', {
        templateUrl: 'app/components/productDetails/productDetails.html',
        controller: 'ProductDetailsController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
