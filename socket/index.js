const { Server } = require("socket.io");

const io = new Server( { cors: {origin : ["http://localhost:3000"]} });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on('addNewUser', (userId) => {
    if(!onlineUsers.some(u => u.userId === userId) && userId !== null){
        onlineUsers.push({
            userId,
            socketId: socket.id
        })
    }

    io.emit('getOnlineUser', onlineUsers);
    console.log(onlineUsers, "add online");

  });

  socket.on("sendMessage",(message) => {
    console.log("send");
    const user = onlineUsers.find(user => user.userId === message.recipientId);

    if(user){
      io.to(user.socketId).emit('getMessage', message);
      
      io.to(user.socketId).emit('getNotification', {
        senderId: message.senderId,
        isRead: false,
        date: new Date()
      });
    }
  });

  socket.on("disconnect", () => {
    console.log('disconnect');
    onlineUsers = onlineUsers.filter(ou => ou.socketId !== socket.id);
    io.emit('getOnlineUser', onlineUsers);
    console.log(onlineUsers, "online");
  });
  
});

io.listen(4000);