const express = require("express");
const app = express();
http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); // Add this
const { all } = require("axios");
require("dotenv").config();

app.use(cors()); // Add cors middleware
const harperSaveMessage = require("./services/harper-save-message");
const server = http.createServer(app); // Add this

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = ""; // E.g. javascript, node,...
let allUsers = [];
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    const { userName, room } = data;

    socket.join(room);
    let __createdtime__ = new Date();
    socket.to(room).emit("receive_message", {
      message: `${userName} has joined the chat room`,
      userName: CHAT_BOT,
      __createdtime__,
    });
    socket.emit("receive_message", {
      message: `Welcome ${userName}`,
      userName: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, userName, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    socket.on("send_message", async (data) => {
      try {
        // Destructure the data object for easier access
        const { message, username, room, __createdtime__ } = data;

        // Emit the received message to all users in the room, including the sender
        io.in(room).emit("receive_message", data);

        // Save the message in the database using asynchronous await
        const response = await harperSaveMessage(
          message,
          username,
          room,
          __createdtime__
        );
      } catch (err) {
        // Handle errors by logging them
        console.error(err);
      }
    });
  });
});

server.listen(4000, () => console.log("Server is running on port 4000"));
