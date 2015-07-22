var Hoek = require('hoek');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);
    var io = server.plugins.hapio.io;


    function createId () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    // CREATE A NEW LIST
    server.route({
      method: 'POST',
      path: options.basePath + '/list/new',
      handler: function (request, reply) {
        var List = request.server.plugins['hapi-mongo-models'].List;

        var hashed = createId();
        var doc = {
          hash: hashed,
          items: [],
          assignedTo: [],
          created: {
            date: new Date(),
            user: request.payload.user
          }
        }

        List.insert(doc, function (err) {
          if (!err) {
            return reply({hash: hashed});
          }
        });

      }
    });

    // GET A SPECIFIC LIST (NEWLY CREATED)
    server.route({
      method: 'GET',
      path: options.basePath + '/list/{hash}',
      handler: function (request, reply) {
        var List = request.server.plugins['hapi-mongo-models'].List;

        io.on('event:item:new', function (socket) {
          console.log("new item");
        });

        List.findOne({ hash: request.params.hash }, function (err, list) {
          if (!err) {
            return reply(list);
          } 
        });

      }
    });

    // UPDATE A SPECIFIC LIST
    server.route({
      method: 'PUT',
      path: options.basePath + '/list/{hash}/update',
      handler: function (request, reply) {
        var List = request.server.plugins['hapi-mongo-models'].List;
        
        var doc = {
          hash: request.params.hash,
          items: request.payload.items,
          assignedTo: request.payload.assignedTo,
          created: request.payload.created,
          updated: {
            date: new Date(),
            user: request.payload.user
          }
        }

        List.update({ hash: request.params.hash }, doc, function (err, list) {
          if (!err) {
            return reply(list);
          } else {
            return reply(err);
          }
        });

      }
    });

    // EMAIL LIST
    server.route({
      method: 'POST',
      path: options.basePath + '/list/{hash}/email',
      handler: function (request, reply) {
        var List = request.server.plugins['hapi-mongo-models'].List;
        console.log("email list");
      }
    });

    // SHARE LIST
    server.route({
      method: 'POST',
      path: options.basePath + '/list/{hash}/share',
      handler: function (request, reply) {
        var List = request.server.plugins['hapi-mongo-models'].List;
        console.log("share list");
      }
    });

    next();

};

exports.register.attributes = {
    name: 'lists'
};