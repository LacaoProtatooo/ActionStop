import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Retrieve your Mailtrap credentials from environment variables
const mailtrapUser = process.env.MAILTRAP_USERNAME; 
const mailtrapPass = process.env.MAILTRAP_PASSWORD; 

// Ensure your sender email is a Mailtrap-provided email
export const sender = '"ActionStop Figurines" <hello@demomailtrap.com>'; // Use your Mailtrap sender email

// Create a Nodemailer transport
const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: mailtrapUser,
        pass: mailtrapPass,
    },
});

export const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: sender,
        to,
        subject,
        html,
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent:', info);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error(`Error sending email: ${error.message}`);
    }
};





// import {MailtrapClient}  from "mailtrap";
// import dotenv from "dotenv";
// dotenv.config();

// //const TOKEN = "4f9ddd7aabcf6f7c747bb368b0690f67";

// export const mailtrapClient = new MailtrapClient({
//   token: process.env.MAILTRAP_TOKEN,
//   endpoint: process.env.MAILTRAP_ENDPOINT,
// });

// export const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };

// // const recipients = [
// //   {
// //     email: "kylasalardaa@gmail.com",
// //   }
// // ];

// // client
// //   .send({
// //     from: sender,
// //     to: recipients,
// //     subject: "You are awesome!",
// //     text: "Congrats for sending test email with Mailtrap!",
// //     category: "Integration Test",
// //   })
// //   .then(console.log, console.error);


// // export const mailtrapClient = new MailtrapClient({
// //    token: process.env.MAILTRAP_TOKEN,
// //    endpoint: process.env.MAILTRAP_ENDPOINT,
// //   });

// // export const sender = {
// //   email: "kylasalardaa@gmail.com",
// //   name: "ActionStop",
// // };

// // const recipients = [
// //   {
// //     email: "kylasalardaa@gmail.com",
// //   }
// // ];

// // mailtrapClient
// //   .send({
// //     from: sender,
// //     to: recipients,
// //     subject: "You are awesome!",
// //     text: "Congrats for sending test email with Mailtrap!",
// //     category: "Integration Test",
// //   })
// //   .then(console.log, console.error, console.log(process.env.MAILTRAP_TOKEN), console.log(process.env.MAILTRAP_ENDPOINT));
  


