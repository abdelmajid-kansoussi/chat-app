const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      name: users[socket.id],
      message: message,
    });
  });

  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id])
    delete users[socket.id]
  });
});

io.listen(3000);
