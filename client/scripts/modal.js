var modal = angular.module('modal', []);
var Please = require('pleasejs/dist/Please.js');
var _ = window._;

modal.directive('modalWindow', ['$localStorage', '$rootScope', function($localStorage, $rootScope) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/modal.html',
    scope: {
      type: '='
    },
    link: function(scope) {
      scope.$watch('type', function(value) {
        scope.type = value;
      });

      scope.people = $localStorage.people;

      scope.closeModal = function() {
        $rootScope.modal = null;
      };

      scope.emailSent = false;
      scope.sendEmail = function() {
        scope.emailSent = true;
      };

      scope.currentUser = $rootScope.currentUser;
      scope.changeColor = function() {
        $rootScope.currentUser.color = Please.make_color()[0];
        _.find($localStorage.people, {id: $rootScope.currentUser.id}).color = $rootScope.currentUser.color;
      };
    }
  };
}]);

module.exports = modal;