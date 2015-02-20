var sidebar = angular.module('sidebar', []);
sidebar.controller('sidebarController', ['$scope', '$localStorage', '$rootScope', function($scope, $localStorage, $rootScope) {
  $scope.openModal = function(modal) {
    $rootScope.modal = modal;
  };

  $scope.emailList = function() {

  };

  $scope.shareList = function() {

  };
}]);

module.exports = sidebar;