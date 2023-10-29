const { messageModel } = require('../dao/mongoManagers/models/messagerModel')

class MsgRepository {
    async getMsgs() {
        const msgs = await messageModel.find();
        return msgs;
    }

    async createMsg(message) {
        const msg = await messageModel.create(message);
        return msg;
    }
}

module.exports = MsgRepository;
