import nodemailer from 'nodemailer';

const from = '"Practical" <info@practical.com>';

function setup() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });
}

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Welcome to World",
        text: `
        Welcome to World. Please, confirm your email.

        ${user.generateConfirmationUrl()}
        `
    };

    transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
    const transport = setup();
    const email = {
        from,
        to: user.email,
        subject: "Reset Password",
        text: `
        To reset password click on this link.

        ${user.generateResetPasswordLink()}
        `
    };

    transport.sendMail(email);
}