'use strict';

let _settings = require('./settings');

let settings = _interopRequireWildcard(_settings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { let newObj = {}; if (obj != null) { for (let key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let io = require('socket.io')(settings.PORT);

let chat = io.of('/chat').on('connection', function (socket) {
  console.log('connected');

  socket.emit('create a room');

  socket.on('a message', function (data) {
    console.log(data.room + ': ' + data.message);
    let room = data.room;
    let message = data.message;
    socket.to(room).broadcast.emit('a message', message);
  }).on('join a room', function (data) {
    console.log(data.room);
    socket.join(data.room);
  }).on('disconnect', function () {
    console.log('disconnect');
  });
});

