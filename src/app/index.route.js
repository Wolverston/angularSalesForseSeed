(function() {
  'use strict';

  angular
    .module('template')
    .config(function($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: '../app/main/main.html',
        controller: 'mainCtrl',
        controllerAs: 'mainCtrl'
      })
    });
})();
