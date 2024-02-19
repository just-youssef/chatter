import { compare, genSalt, hash } from "bcrypt";
import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import { randomBytes } from "crypto";
import sendEmail from "../utils/sendEmail.js";

const register = async (req, res, nxt) => {
    try {
        // extrct data from request body
        const { first_name, last_name, gender, email, password } = req.body;

        // check if email exits
        let user = await User.findOne({ email });
        if (user) {
            console.log("email already exists");
            return res.status(400).json({ error: { email: "email already exists" } });
        }

        // hash the password
        let saltRounds = await genSalt();
        let hashedPassword = await hash(password, saltRounds);

        // random avatar based on gender
        const avatar = gender === "male" ?
            `https://avatar.iran.liara.run/public/boy?username=${first_name+last_name}`
            : `https://avatar.iran.liara.run/public/girl?username=${first_name+last_name}`

        user = new User({
            first_name, last_name, email, gender, avatar,
            password: hashedPassword,
        });

        // save to db
        await user.save();
        console.log("user created..");

        // create verfication token
        let token = new Token({
            user: user._id,
            value: randomBytes(32).toString('hex')
        })

        // save to db
        await token.save();
        console.log("verfication token created..");

        // send email verfication
        const msg = `${process.env.CLIENT}/verification-confirm/${user._id}/${token.value}`
        await sendEmail(user.email, 'Chatter Email Verfication', msg)

        return res.status(201).json({ userID: user._id })
    } catch (err) {
        nxt(err);
    }
}

// verify email
const verify = async (req, res, nxt) => {
    try {
        // check user exists
        let user = await User.findById(req.params.id);
        if (!user) return res.status(400).json({ error: "invalid id" });

        // check if already verfied
        if (user.verified) {
            console.log('email already verified');
            return res.json({ message: "email already verified", verified: user.verified })
        };

        // check token exists
        let token = await Token.findOne({ value: req.params.token, user: user._id });
        if (!token) return res.status(400).json({ error: "invalid token" });

        // verify user then delete token
        await user.verifyEmail();
        await Token.findByIdAndDelete(token._id)
        console.log('email verfied');

        return res.json({ message: 'email verified', verified: user.verified })
    } catch (err) {
        nxt(err)
    }
}

// check if email verified
const checkVerfication = async (req, res, nxt) => {
    try {
        // check user exits
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found" });

        return res.json({ verified: user.verified })
    } catch (err) {
        nxt(err)
    }
}

const resendVerfication = async (req, res, nxt) => {
    try {
        // check user exits
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found" });

        // check if already verfied
        if (user.verified) {
            console.log('email already verified');
            return res.json({ message: 'already verified' })
        };

        // get and delete old tokens
        let tokens = await Token.find({ user: user._id });
        if (tokens) {
            for (let t of tokens) {
                await Token.findByIdAndDelete(t._id)
            }
        }

        // create new verfication token
        let token = new Token({
            user: user._id,
            value: randomBytes(32).toString('hex')
        })

        // save to db
        await token.save();
        console.log("new verfication token created..");

        // send email verfication
        const msg = `${process.env.CLIENT}/verification-confirm/${user._id}/${token.value}`
        await sendEmail(user.email, 'RealEstate Email Verfication', msg)

        return res.json({ message: 'verfication sent again' })
    } catch (error) {

    }
}

// login
const login = async (req, res, nxt) => {
    try {
        // extrct data from request body
        const { email, password } = req.body;

        // check if email not exits
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: { email: "email doesn't exists" } });

        // check password
        let valid = await compare(password, user.password);
        if (!valid) return res.status(400).json({ error: { password: "incorrect password" } });

        // generate access token and extrat user data
        let token = user.genAuthToken();
        const { _id, first_name, last_name, gender, avatar } = user._doc;

        // set token & send response
        res.cookie("access_token", token, {
            maxAge: 14 * 24 * 60 * 60 * 1000, // must be in ms
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "prod"
        })
        console.log("user logged in");

        return res.json({ _id, first_name, last_name, email, gender, avatar });
    } catch (err) {
        nxt(err)
    }
}

// logout
const logout = async (req, res, nxt) => {
    try {
        res.clearCookie("access_token");
        console.log("user logged out");
        return res.json({ message: "user logged out" })
    } catch (err) {
        nxt(err)
    }
}



export {
    register,
    verify,
    checkVerfication,
    resendVerfication,
    login,
    logout,
}