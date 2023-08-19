// const io = require('socket.io')(8900, {
//   cors: {
//     origin: 'http://wasally.me',
//   },
// });

let users = [];

const addUser = (userId, socketId) => {
  // eslint-disable-next-line no-unused-expressions
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports ={
  users,
  addUser,
  removeUser,
  getUser
}

// io.on('connection', (socket) => {
//   // when connect
//   // eslint-disable-next-line no-console
//   console.log('a user connected.');
//   // take userId and socketId from user
//   socket.on('addUser', (userId) => {
//     addUser(userId, socket.id);
//     io.emit('getUsers', users);
//   });

//   // send and get message
//   socket.on('sendMessage', ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     console.log(user);
//     console.log('senderId',senderId)
//     console.log('receiverId',receiverId)
//     console.log(text)
//     io.to(user.socketId).emit('getMessage', {
//       senderId,
//       text,
//     });
//   });

//   // when disconnect
//   socket.on('disconnect', () => {
//     // eslint-disable-next-line no-console
//     console.log('a user disconnected!');
//     removeUser(socket.id);
//     io.emit('getUsers', users);
//   });
// });
