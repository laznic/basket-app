var single = angular.module('single', []),
    _ = window._;

single.controller('singleItemController', ['$route', '$location', '$scope', 'locker', '$routeParams', '$filter', '$rootScope', function($route, $location, $scope, locker, $routeParams, $filter, $rootScope) {
  $scope.people = $rootScope.people;
  $scope.newComment = {user: $rootScope.currentUser, text: '', created: null};

  // Basic checking if an item exists
  var item = locker.retrieveItem();
  $scope.list = locker.retrieveList();
  if(item) {
    $scope.item = item;
    $scope.item.newComments = false;
  } else {
    $location.path('/');  
  }

  $scope.$watch('item', function(value) {
    locker.storeItem(value);
  });

  $scope.$watch('list', function(value) {
    locker.storeList(value);
  });

  // Delete item function
  $scope.delete = function() {
    var index = $scope.list.items.indexOf($scope.item);
    $scope.list.items.splice(index, 1);
    $location.path('/');
  };

  // Go back to list view
  $scope.goBack = function() {
    delete $scope.item;
    $location.path('/' + $scope.list.id);
  };

  // Assign person to item
  $scope.assignPeople = function(person) {
    if(!$scope.checkIfAssigned(person)) {
      $scope.item.assignedTo.push(person);
    } else {
      var index = $scope.item.assignedTo.indexOf(person); 
      $scope.item.assignedTo.splice(index, 1); 
    }
  };

  // Check if a person is already assigned
  $scope.checkIfAssigned = function(person) {
    if(_.find($scope.item.assignedTo, function(item) {
      return item.id === person.id;
    })) return true;
  };

  // Comment the item
  $scope.addComment = function() {
    $scope.newComment.created = new Date();
    $scope.item.comments.push($scope.newComment);
    $scope.newComment = {user: $rootScope.currentUser, text: '', created: null };
    $scope.item.newComments = true;
  };
  
  // Check item
  $scope.checkItem = function() {
    this.item.checked = !this.item.checked;
  };

}]);

module.exports = single;