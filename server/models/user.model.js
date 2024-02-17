import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    'first_name': {
        type: String,
        trim: true,
        required: [true, "first_name field is required"],
    },
    'last_name': {
        type: String,
        trim: true,
        required: [true, "last_name field is required"],
    },
    'email': {
        type: String,
        unique: true,
        trim: true,
        required: [true, "email field is required"],
    },
    'password': {
        type: String,
        required: [true, "password field is required"],
    },
    'verified': {
        type: Boolean,
        default: false,
    },
    'avatar':{
        type: String,
        default: ''
    }
}, { timestamps: true });

UserSchema.methods.genAuthToken = function () {
    // generate jwt
    return jwt.sign({ userID: this._id }, process.env.JWT_SECRET);
}

UserSchema.methods.verifyEmail = async function () {
    // set verified to true
    this.verified = true;
    await this.save();
}

const User = model('User', UserSchema);
export default User;