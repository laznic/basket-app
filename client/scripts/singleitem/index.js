var single = angular.module('single', []),
    _ = require('lodash');

single.controller('singleItemController', ['$route', '$location', '$scope', '$localStorage', 'getItemState', '$routeParams', '$filter', function($route, $location, $scope, $localStorage, getItemState, $routeParams, $filter) {

  // Basic checking if an item exists
  if($localStorage.item) {
    $scope.item = $localStorage.item;
  } else {
    $location.path('/' + $localStorage.list.id);
  }

  $scope.people = $localStorage.people;

  // Delete item function
  $scope.delete = function() {
    var index = $localStorage.list.items.indexOf($scope.item);
    $localStorage.list.items.splice(index, 1);
    $location.path('/');
  };

  // Go back to list view
  $scope.goBack = function() {
    delete $localStorage.item;
    $location.path('/' + $localStorage.list.id);
  };

  // Assign person to item
  $scope.assignPeople = function(person) {
    if(!checkIfAssigned(person)) {
      $scope.item.assignedTo.push(person);
    } else {
      var index = $scope.item.assignedTo.indexOf(person); 
      $scope.item.assignedTo.splice(index, 1); 
    }
  };

  function checkIfAssigned(person) {
    if(_.find($scope.item.assignedTo, function(item) {
      return item.id === person.id;
    })) return true;
  }

  $scope.newComment = {user: $localStorage.currentUser, text: '', created: null};

  // Comment the item
  $scope.addComment = function() {
    $scope.newComment.created = new Date();
    $scope.item.comments.push($scope.newComment);
    $scope.newComment = {user: $localStorage.currentUser, text: '', created: null };
  };
  

}]);

module.exports = single;