const MessageManager = require('../dao/mongoManagers/MessageManager')
const { socketServer } = require('../app')

const msgManager = new MessageManager()

exports.getMsg = async (req, res) => {
    const messages = await msgManager.getMsgs();

    socketServer.on("connection", socket => {
        console.log(`Usuario conectado: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log("Usuario desconectado");
        });

        socket.on("newUser", user => {
            console.log("Usuario:", user);
        });

        socket.on("message", async info => {
            messages.push(info);
            socketServer.emit("chat", messages);
            await msgManager.createMsg(info);
        });
    });

    res.render("chat");
}
