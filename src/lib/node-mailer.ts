import nodemailer from 'nodemailer';
import { verifyEmailComposer } from '../mail-template/veiryEmail';


const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: false,
    secure: false,
})




export async function sendMail(email: string, token: string) {
    const emailContent = verifyEmailComposer(email, token);


    const info = await transporter.sendMail({
        from: 'admin@example.com',
        to: "linhdevtd99@example.com",
        subject: "Hello",
        text: "Hello world?",
        html: emailContent,
    });

    console.log("Message sent: %s", info.messageId);
}

