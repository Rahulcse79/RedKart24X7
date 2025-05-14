const nodemailer = require('nodemailer');

const MailHost = process.env.MAIL_HOST || "mail.coraltele.com";
const MailPort = parseInt(process.env.MAIL_PORT, 10);
const MailSecure = process.env.MAIL_SECURE === 'true';
const MailUser = process.env.MAIL_USER || "mailgateway@coraltele.com";
const MailPassword = process.env.MAIL_PASSWORD || "%$#Maig#$&7634";

const otpStoreUser = {};
const otpStoreSeller = {};

const deleteOldOTPUser = () => {
    const currentTime = Date.now();
    const expirationTime = 5 * 60 * 1000;

    for (const email in otpStoreUser) {
        if (otpStoreUser.hasOwnProperty(email)) {
            const { timestamp } = otpStoreUser[email];
            if (currentTime - timestamp > expirationTime) {
                delete otpStoreUser[email];
            }
        }
    }
};

const deleteOldOTPSELLER = () => {
    const currentTime = Date.now();
    const expirationTime = 5 * 60 * 1000;

    for (const email in otpStoreSeller) {
        if (otpStoreSeller.hasOwnProperty(email)) {
            const { timestamp } = otpStoreSeller[email];
            if (currentTime - timestamp > expirationTime) {
                delete otpStoreSeller[email];
            }
        }
    }
};

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: MailHost,
        port: MailPort,
        secure: MailSecure,
        auth: {
            user: MailUser,
            pass: MailPassword,
        },
    });

    const mailOptions = {
        from: `"Shop200" <${MailUser}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
     
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// OTP-only plain-text mail sender
const SendmailTootp = async (username, MailSubject, MailText) => {
    const transporter = nodemailer.createTransport({
        host: MailHost,
        port: MailPort,
        secure: MailSecure,
        auth: {
            user: MailUser,
            pass: MailPassword,
        },
    });

    const mailOptions = {
        from: MailUser,
        to: username,
        subject: MailSubject,
        text: MailText,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        return false;
    }
};

// Generate random 6-digit OTP
const generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Main OTP send logic
const SendOTP = async (email, UseFor) => {

    const otp = generateRandomOTP();
    const MailSubject = "Your Shop200 OTP Code";
    const MailText = `
Dear ${UseFor},

Thank you for using Shop200. Your One-Time Password (OTP) is:

${otp}

This OTP is valid for 5 minutes. Please do not share it with anyone.

If you did not request this OTP, you can ignore this message.

Best regards,
Shop200 Team
  `;

    const result = await SendmailTootp(email, MailSubject, MailText);
    if (result) {
        if(UseFor === "Seller") {
            otpStoreSeller[email] = {
                otp,
                timestamp: Date.now(),
            };
            return true;
        } else if (UseFor === "User") {
            otpStoreUser[email] = {
                otp,
                timestamp: Date.now(),
            };
            return true;
        }
    }

    return false;
};

const CheckOTPUser = async (email, OTP) => {
    const record = await otpStoreUser[email];
    if (record && record.otp === OTP) {
        const now = Date.now();
        const isExpired = now - record.timestamp > 5 * 60 * 1000;
        if (!isExpired) {
            return true;
        }
    }
    return false;
};

const CheckOTPSeller = async (email, OTP) => {
    const record = await otpStoreSeller[email];
    if (record && record.otp === OTP) {
        const now = Date.now();
        const isExpired = now - record.timestamp > 5 * 60 * 1000;
        if (!isExpired) {
            return true;
        }
    }
    return false;
};

module.exports = {
    sendEmail,
    SendOTP,
    CheckOTPUser,
    SendmailTootp,
    CheckOTPSeller,
    CheckOTPSeller
};
