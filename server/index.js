var Hapi = require('hapi'),
    Glue = require('glue'),
    path = require('path'),
    socketIO = require('socket.io');

var composeOptions = {
  relativeTo: __dirname
};

var manifest = {
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [
    {
      host: 'localhost',
      port: 6678,
      labels: ['web']
    }
  ],
  plugins: {
    'lout': {},
    'visionary': {
      engines: { jade: 'jade' },
      path: path.join(__dirname, '../client/')
    },
    'hapi-mongo-models': {
      mongodb: {
        url: 'mongodb://localhost:27017/basket'
      },
      autoIndex: true
    },
    'hapio': {},
    './plugins/web/index': {}
  }
};

Glue.compose(manifest, composeOptions, function (err, server) {
  if(err) {
    throw err;
  }

  server.start(function () {
    var io = server.plugins.hapio.io;
    io.on('connection', function(socket) {
      socket.emit('event:connect', {msg: 'lulz'});
    });
    console.log('Server started');
  });
});