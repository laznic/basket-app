var storage = angular.module('storage', []);
storage.factory('locker', function() {
  var item, list;
  return {
    storeItem : function(i) {item = i;},
    retrieveItem : function() {
      return item;
    },
    storeList : function(l) {list = l;},
    retrieveList : function() {
      return list;
    }
  };
});
module.exports = storage;