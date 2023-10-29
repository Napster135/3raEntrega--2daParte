const MsgRepository = require('../../repositories/messagesRepository')
const messageRepository = new MsgRepository()

class MessageManager {
    
    async getMsgs() {
        try {
            const msgs = await messageRepository.getMsgs();
            return msgs;
        } catch (error) {
            return error;
        }
    }

    async createMsg(message) {
        try {
            const msg = await messageRepository.createMsg(message);
            return msg;
        } catch (error) {
            return error;
        }
    }
}

module.exports = MessageManager
