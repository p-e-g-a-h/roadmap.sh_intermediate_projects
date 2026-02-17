#!/usr/bin/env node
const server = require("socket.io");
const { io: Client } = require("socket.io-client");
const readline = require("node:readline");
const { program } = require("commander");

const port = process.env.PORT || 3000;

program.command("start").action(async () => {
  const io = server(port);

  let connectedClients = [];

  console.log(`server is running on port ${port}`);

  io.on("connection", (socket) => {
    connectedClients.push(socket.id);
    console.log(
      `client connected: ${socket.id}. total: ${connectedClients.length}`,
    );

    socket.on("client_message", (text) => {
      socket.broadcast.emit("server_broadcast", `client ${socket.id}: ${text}`);
    });

    socket.on("disconnect", (reason) => {
      connectedClients = connectedClients.filter((id) => id != socket.id);
      console.log(
        `client disconnected: ${socket.id}. reason: ${reason}. total: ${connectedClients.length}`,
      );
    });
  });

  process.on("SIGINT", () => {
    io.close(() => {
      console.log("server closed.");
      process.exit(0);
    });
  });
});

program.command("connect").action(async () => {
  const socket = Client(`http://localhost:${port}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (text) => {
    if (text.trim()) {
      socket.emit("client_message", text);
    }
  });

  socket.on("connect", () => {
    console.log("type anything and press enter:");
  });

  socket.on("server_broadcast", (text) => {
    console.log(text);
  });
});

program.parse();
