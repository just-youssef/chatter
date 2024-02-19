import { Schema, model } from "mongoose";

const ConversationSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        }
    ],
}, { timestamps: true })

const Conversation = model('Conversation', ConversationSchema);
export default Conversation;