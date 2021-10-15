const { Server } = require("socket.io");

const server = new Server();

server.use((socket, next) => {
    if (!socket.handshake.headers.authorization) {
        const err = new Error("Not Authorized");
        return next(err);
    }
    next();
});

server.on("connection", (socket) => {
    console.log("New Connection");
});

server.listen(3333);

setInterval(() => {
    console.log("hit");
    server.to("staging-updates").emit("notification");
}, 5000);