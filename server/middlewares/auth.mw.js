import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const AuthMW = async(req, res, nxt) => {
    try {
        // get token
        let token = req.cookies.access_token
        if (!token) return res.status(401).json({ error: "access denied" });

        // verify token signature
        let payload = jwt.verify(token, process.env.JWT_SECRET);

        // check if token have userId encoded (valid token)
        if (!payload.userId) return res.status(401).json({ error: "access denied" });

        // check if token user not exists (not authenticated)
        let user = await User.findById(payload.userId);
        if (!user) return res.status(404).json({ error: "token user not exists" });

        // if user exists (authenticated)
        // req.user = user
        req.userId = payload.userId

        // if user is admin (authorized)
        // req.isAdmin = user.isAdmin
        nxt();
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ error: "invalid token" });
    }
}

export default AuthMW