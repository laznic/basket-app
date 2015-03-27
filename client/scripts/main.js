// Get Angulars and setup dependencies
require('angular');
require('angular-route');
require('angular-resource');
require('angular-animate');
require('angular-socket-io');
var Please = require('pleasejs/dist/Please.js');

var dependencies = [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'btford.socket-io'
];

// Get custom modules and push them to dependencies
var modules = [
  require('./resource'),
  require('./storage'),
  require('./list'),
  require('./singleitem'),
  require('./modal')
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
      templateUrl: views + 'list',
      controller:  'listController'
    })
    .when(baseUrl + ':list?/:item', {
      templateUrl: views + 'singleitem',
      controller: 'singleItemController'
    })
    .otherwise({redirectTo: baseUrl});

  // $locationProvider.html5Mode(true);
}]);

// Setup mock data
app.run(['$location', '$rootScope', function($location, $rootScope) {

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.frontPage = true;
      if(~current.$$route.originalPath.indexOf(':item')) {
        $rootScope.frontPage = false;  
      }
  });

  $rootScope.openModal = function(modal) {
    $rootScope.modal = modal;
  };

  $rootScope.toggleMenu = function() {
    $rootScope.menutoggled = !$rootScope.menutoggled;
  }

  if(!$rootScope.currentUser && !$rootScope.people) {
    $rootScope.currentUser = {id: 1, firstname: 'John', lastname: 'Doe', email:'john.doe@domain.com', profilepicture: '', color: '' };
    $rootScope.people = [
        $rootScope.currentUser,
        { id: 2, firstname: 'Jane', lastname: 'Doe', email:'jane.doe@domain.com', shared: true, profilepicture: '', color: '' },
        { id: 3, firstname: 'Bob', lastname: 'Dylan', email:'bob@dylan.com', shared: true, profilepicture: '', color: '' },
        { id: 4, firstname: 'Jack', lastname: 'Black', email:'jack.black@lulz.com', shared: true, profilepicture: '', color: '' },
      ];
      _.each($rootScope.people, function(person) {
        person.color = Please.make_color()[0];
      });

      $rootScope.currentUser.color = $rootScope.people[0].color;
  }
}]);

app.factory('sockets', ['socketFactory', function(socketFactory) {
  var sockets = socketFactory();
  sockets.forward('event:connect');
  return sockets;
}]);

