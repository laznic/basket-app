var modal = angular.module('modal', []);
var Please = require('pleasejs/dist/Please.js');
var _ = window._;

modal.directive('modalWindow', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/modal',
    scope: {
      type: '='
    },
    link: function(scope) {
      scope.$watch('type', function(value) {
        scope.type = value;
        scope.addPerson = false;
      });

      scope.people = $rootScope.people;
      scope.newPerson = { id: null, firstname: '', lastname: '', email: '', shared: false, profilepicture: '', color: '' };

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
        _.find($rootScope.people, {id: $rootScope.currentUser.id}).color = $rootScope.currentUser.color;
      };

      scope.addNewPerson = function() {
        var previous = _.last($rootScope.people).id;
        scope.newPerson.id = previous + 1;
        scope.newPerson.shared = true;
        scope.newPerson.color = Please.make_color()[0];

        $rootScope.people.push(scope.newPerson);
        scope.newPerson = { id: null, firstname: '', lastname: '', email: '', shared: false, profilepicture: '', color: '' };
        
      };
    }
  };
}]);

module.exports = modal;