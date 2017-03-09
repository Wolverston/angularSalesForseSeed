(function() {
  'use strict';

  angular
  .module('template')
   .config(function($routeProvider) {
    $routeProvider
    .when('/dashboard', {
       templateUrl: '../app/main/main.html',
      controller: 'mainCtrl',
      controllerAs: 'mainCtrl'
    })
  })
})();



// (function() {
//   'use strict';

//   angular
//   .module('inspinia')

//   /** @ngInject */
//   .config(function($routeProvider) {
//     $routeProvider
//     .when('/dashboard', {
//       templateUrl: 'app/home/VP_HomePage.html',
//       controller: 'homeCtrl',
//       controllerAs: 'homeCtrl'
//     })
//     .otherwise({redirectTo: '/dashboard'})
//   })
// })();



// .when('/', {
//       templateUrl: '../app/main/main.html',
//       controller: 'mainCtrl',
//       controllerAs: 'mainCtrl'
//     })