import { createTransport } from "nodemailer"

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject, text,
        });

        console.log('email verfication sent');
    } catch (error) {
        console.log('error, email verfication not sent');
        console.log(error.message);
    }
}

export default sendEmail