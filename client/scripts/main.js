// Get Angulars and setup dependencies
require('angular');
require('angular-route');
require('angular-resource');
require('angular-animate');
require('ngstorage'); 
require('lodash'); 

var dependencies = [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngStorage'
];

// Get custom modules and push them to dependencies
var modules = [
  require('./storage'),
  require('./list'),
  require('./singleitem')
];

modules.forEach(function(model) {
  dependencies.push(model.name);
});

// Define paths and Angular app
var views   = 'views/',
    baseUrl = '/',
    app     = angular.module('basket', dependencies);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when(baseUrl + ':list?', {
      templateUrl: views + 'list.html',
      controller:  'listController'
    })
    .when(baseUrl + ':list?/:item', {
      templateUrl: views + 'singleitem.html',
      controller: 'singleItemController'
    })
    .otherwise({redirectTo: baseUrl});

  // $locationProvider.html5Mode(true);
}]);

// Setup mock data
app.run(['$location', '$localStorage', function($location, $localStorage) {
  $localStorage.currentUser = {id: 1, firstname: 'John', lastname: 'Doe' };
  $localStorage.people = [
      { id: 2, firstname: 'Jane', lastname: 'Doe', shared: true },
      { id: 3, firstname: 'Bob', lastname: 'Dylan', shared: true },
      { id: 4, firstname: 'Jack', lastname: 'Black', shared: true },
    ];
}]);

