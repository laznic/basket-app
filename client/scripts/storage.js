var storage = angular.module('itemState', []);
storage.factory('getItemState', function() {
    var item;
    return {
        storeItem : function(i) {item = i;},
        retrieveItem : function() {
            return item;
        }
    };

});

module.exports = storage;