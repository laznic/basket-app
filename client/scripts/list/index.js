var list = angular.module('list', []),
    _    = window._;

list.controller('listController', ['$route', '$location', '$scope', '$rootScope', '$routeParams', 'locker', function($route, $location, $scope, $rootScope, $routeParams, locker) {
  $scope.currentUser = $rootScope.currentUser;
  $scope.checkedList = [];
  $scope.addItemText = 'What do you need?';

  // Basic checking if a list exists
  var list = locker.retrieveList();
  if(list) {
    $scope.list = list;
    if($location.path('/')) {
      $location.path('/' + $scope.list.id);  
    }
  } else {
    resetList();  
  }
  $scope.$watch('list', function(value) {
    locker.storeList(value);
    if(value.items.length) {
      $scope.addItemText = 'What else do you need?';
    }
  });

  // Create ID for the list
  function createId() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
  }

  // Setup list when using the app the first time, resets it when creating a new one
  function resetList() {
    $scope.list = { id: '', items: [], sharedWith: []};
  }

  // New list creation
  function createNewList() {
    $scope.list.id = createId();
    $location.path('/' + $scope.list.id);   
  }

  $scope.addNewList = function() {
    if($scope.list) {
      resetList();
      createNewList();
    } else {
      createNewList();
    }
  };

  // Add new item to the list
  $scope.addNewItem = function() {
    $scope.addItemText = 'What else do you need?';
    $scope.list.items.push({text: '', checked: false, assignedTo: [], comments: [], newComments: false});
    $scope.focus = $scope.list.items.length;
  };

  // Delete item from the list
  $scope.deleteItem = function(item) {
    var index = $scope.list.items.indexOf(item); 
    $scope.list.items.splice(index, 1);
  };

  // Check out item
  $scope.checkItem = function() {
    this.item.checked = !this.item.checked;
  }

  // Go to item edit view
  $scope.editItem = function() {
    locker.storeItem(this.item);
    $location.path('/' + $routeParams.list + '/' + slugify(this.item.text));
  }

  // Pretty url-slug 
  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}]);

// Autofocus new item input field
list.directive('autofocusThis', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(function() {
        return scope.$eval(attrs.autofocusThis);
      }, function(newValue) {
        if(newValue === false) {
          element[0].focus();
        } 
      });
    }
  }
});

// Reversing the list so that new items appear on top of the list
list.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

module.exports = list;