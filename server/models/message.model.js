import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "sender field is required"],
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "receiver field is required"],
    },
    content: {
        type: String,
        required: [true, "content field is required"],
    }
}, { timestamps: true });

const Message = model('Message', MessageSchema);
export default Message;