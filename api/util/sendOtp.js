const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS 
            }
        });

        const mailOptions = {
          from: process.env.MAIL_USER,
          to: email,
          subject: "Your OTP for Verification",
          text: `Dear User, /nWe have received a request to verify your account./nYour OTP for verification is: ${otp}./nIt is valid for 5 minutes./nIf you did not request this, please ignore this email. If you have any concerns, feel free to contact us./nBest regards,/nTaskFlow`,
        };

        await transporter.sendMail(mailOptions);

        return otp;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Unable to send OTP');
    }
};

module.exports = { sendOtp };
