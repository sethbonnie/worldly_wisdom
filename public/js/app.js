angular.module('WorldlyWisdom', ['ngRoute', 'ngAnimate'])

.constant('TotalMaxims', 300)

.config(['$routeProvider', '$locationProvider', 
function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/views/title-page',
    controller: 'TitlePageCtrl'
  })
  .when('/maxims', {
    templateUrl: '/views/title-page',
    controller: 'TitlePageCtrl'
  })
  .when('/maxims/:id', {
    templateUrl: '/views/maxim',
    controller: 'MaximCtrl'
  });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
}]);