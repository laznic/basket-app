var resource = angular.module('resource', []);

resource.factory('listApi', ['$resource', function ($resource) {
  var api = $resource(null, { id: '@id', hash: '@hash' }, {
    createNewList: {
      method: 'POST',
      url: 'api/list/new'
    },
    getList: {
      method: 'GET',
      url: 'api/list/:hash'
    },
    updateList: {
      method: 'PUT',
      url: 'api/list/:hash/update'
    },
    emailList: {
      method: 'POST',
      url: 'api/list/:hash/email'
    },
    shareList: {
      method: 'POST',
      url: 'api/list/:hash/share'
    }
  });
  return api;
}]);

resource.factory('userApi', ['$resource', function($resource){
  var api = $resource(null, { id: '@id' }, {
    getUser: {
      method: 'GET',
      url: 'api/user/:id'
    },
    updateUser: {
      method: 'PUT',
      url: 'api/user/:id/update'
    }
  });
  return api;
}]);

module.exports = resource;