import User from "../models/user.model.js";
import { compare, genSalt, hash } from "bcrypt";

// get user contacts
const getContacts = async (req, res, nxt) => {
    try {
        const contacts = await User.find({}).select("first_name last_name email avatar");

        return res.json(contacts);
    } catch (err) {
        nxt(err)
    }
}

// update user
const updateUser = async (req, res, nxt) => {
    try {
        // check if email already exists
        if (req.body.email) {
            let email_exists = await User.findOne({ email: req.body.email });
            if (email_exists && email_exists._id.toString() !== req.userID) {
                console.log("email already exists");
                return res.status(400).json({ error: { email: "email already exists" } });
            }
        }

        // update user by req.body
        const updatedUser = await User.findByIdAndUpdate(req.userID, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                avatar: req.body.avatar,
            }
        }, { new: true });
        console.log("user updated");

        // extract and send user data
        const { _id, first_name, last_name, email, gender, avatar } = updatedUser._doc;
        return res.json({ _id, first_name, last_name, email, gender, avatar })
    } catch (err) {
        nxt(err)
    }
}

// change password
const changePassword = async (req, res, nxt) => {
    try {
        // extrct data from request body
        const { old_password, new_password } = req.body;

        // get user details
        let user = await User.findById(req.userID);

        // check old_password
        let valid = await compare(old_password, user.password);
        if (!valid) return res.status(400).json({ error: { old_password: "old password is incorrect" } });

        // check if old and new password is not matched
        let matched = await compare(new_password, user.password);
        if (matched) return res.status(400).json({ error: { new_password: "new password cannot be same as old password", same: true } });

        // hash the password
        let saltRounds = await genSalt();
        let hashedPassword = await hash(new_password, saltRounds);

        // update password
        user.password = hashedPassword
        await user.save()
        console.log('password changed');

        return res.json({ message: 'password changed' })
    } catch (err) {
        nxt(err);
    }
}

// delete user
const deleteUser = async (req, res, nxt) => {
    try {
        // delete user
        await User.findByIdAndDelete(req.userID);

        // return response
        return res.json({ message: "user deleted..!" })
    } catch (err) {
        nxt(err)
    }
}

export {
    getContacts,
    updateUser,
    changePassword,
    deleteUser
}