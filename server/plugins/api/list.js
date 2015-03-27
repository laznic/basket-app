var Hoek = require('hoek');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);
    
    function createId() {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    server.route({
      method: 'GET',
      path: options.basePath + '/list/new',
      handler: function (request, reply) {
        var List = request.server.plugins['hapi-mongo-models'].List;
        var hashed = createId();
        List.insert({ 
          hash: hashed,
          items: [],
          assignedTo: [],
          created: { },
          updated: { }
        }, function () {
          reply.redirect('/#/' + hashed);
        });

      }
    });

    next();

};

exports.register.attributes = {
    name: 'lists'
};