'use strict';

var s_settings = require('./settings');

var settings = _interopRequireWildcard(s_settings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var io = require('socket.io')(settings.PORT);

var chat = io.of('/chat').on('connection', function (socket) {
  console.log('connected');

  socket.emit('create a room');

  socket.on('a message', function (data) {
    console.log(data.room + ': ' + data.message);
    var room = data.room;
    var message = data.message;
    socket.to(room).broadcast.emit('a message', data);
  }).on('join a room', function (data) {
    console.log(data.room);
    socket.join(data.room);
  }).on('disconnect', function () {
    console.log('disconnect');
  });
});
