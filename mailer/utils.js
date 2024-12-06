import nodemailer from "nodemailer";
import env from "dotenv";

export async function sendMail(subject, text) {
  env.config();

  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject,
    text,
  };

  const smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.APP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  transporter.sendMail(message, function (error, result) {
    console.log(error || result);
  });
}
