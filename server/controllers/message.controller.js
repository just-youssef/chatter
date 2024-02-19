import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessage = async (req, res, nxt) => {
    try {
        const { msg } = req.body;
        const sender = req.userId;
        const receiver = req.params.id;
        if (!receiver) return res.status(403).json({ error: "receiver is required" })

        // find conversation if exists
        let conv = await Conversation.findOne({
            participants: { $all: [sender, receiver] },
        })

        // create conversation if not exists
        if (!conv) {
            conv = await Conversation.create({
                participants: [sender, receiver],
            })
        }

        // create new message
        const newMessage = await Message.create({
            sender,
            receiver,
            content: msg,
        })

        // save new message in conversation history & return response
        conv.messages.push(newMessage);
        await conv.save();

        return res.status(201).json(newMessage);
    } catch (err) {
        nxt(err)
    }
}

const getMessages = async (req, res, nxt) => {
    try {
        const sender = req.userId;
        const receiver = req.params.id;
        if (!receiver) return res.status(403).json({ error: "receiver is required" })

        // get conversation if exists
        let conv = await Conversation.findOne({
            participants: { $all: [sender, receiver] },
        }).populate({
            path: "messages",
            populate: {
                path: "sender receiver",
                select: "first_name last_name email avatar",
            }
        }).select("messages");

        // create conversation if not exists
        if (!conv) {
            conv = await Conversation.create({
                participants: [sender, receiver],
            })
        }

        return res.json(conv.messages);
    } catch (err) {
        nxt(err);
    }
}

export {
    sendMessage,
    getMessages
}