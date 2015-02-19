var list = angular.module('list', []),
    _    = window._;

list.controller('listController', ['$route', '$location', '$scope', '$rootScope', '$localStorage', '$routeParams', 'getItemState', function($route, $location, $scope, $rootScope, $localStorage, $routeParams, getItemState) {
  // Basic checking if a list exists
  if($localStorage.list) {
      if($location.path('/')) {
        $location.path('/' + $localStorage.list.id);  
      }
      $scope.list = $localStorage.list;

  } else {
    resetList();
  }

  $scope.currentUser = $localStorage.currentUser;

  $scope.checkedList = [];

  function createId() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
  }

  function resetList() {
    $scope.list = { id: '', items: [], sharedWith: []};
    $localStorage.list = $scope.list;
  }

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
  $scope.addNewItem = function(index) {
    $scope.list.items.push({text: '', checked: false, assignedTo: [], comments: [], newComments: false});
    $scope.focus = $scope.list.items.length - 1;
  };

  $scope.deleteItem = function(item) {
    var index = $scope.list.items.indexOf(item); 
    $scope.list.items.splice(index, 1);
  };

  $scope.checkItem = function() {
    this.item.checked = !this.item.checked;
  }

  // Go to item edit view
  $scope.editItem = function() {
    $localStorage.item = this.item;
    $location.path('/' + $routeParams.list + '/' + slugify(this.item.text));
  }

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}]);

list.directive('autofocusThis', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(function() {
        return scope.$eval(attrs.autofocusThis);
      }, function(newValue) {
        if(newValue == true) {
          element[0].focus();
        } 
      })
    }
  }
});



module.exports = list;