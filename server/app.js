// .env and mongodb
import { configDotenv } from "dotenv";
import { connect } from 'mongoose';

// cloudinary cloud
import { v2 as cloudinary } from 'cloudinary' ;

// express and third party modules
import express, { urlencoded, json } from "express";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import path from "path";

// routers
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import messageRouter from './routes/message.router.js';

// error middleware
import ErrorMW from "./middlewares/error.mw.js";

// load environment variables
configDotenv();

// connect to mongodb
connect(process.env.MONGODB_URI, { dbName: 'chatter' })
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.log(err.message))

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// initialize app
const app = express();

// render react
// const root = path.join(path.resolve(), "..", "client", "dist")
// app.use(express.static(root));
// app.get('*', (req, res, nxt) => {
//     if (!req.url.startsWith("/api")) {
//         return res.sendFile(path.join(root, 'index.html'));
//     }

//     nxt();
// });

// using third party modules
app.use(cors());
app.use(helmet());
app.use(urlencoded({ extended: true, }));
app.use(json());
app.use(cookieParser());

// using routers
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

// using error middleware at the end
app.use(ErrorMW);

// start app
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
    console.log(`CLIENT: ${process.env.CLIENT}`)
    console.log(`API_ROOT: ${process.env.API_ROOT}`)
})