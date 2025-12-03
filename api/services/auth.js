const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('../util/sendOtp');

class AuthService {

    static async registerUser(userData) {
        const { name, email, password } = userData;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return newUser;
    }

    static async loginUserWithPassword(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        return { token, user };
    }

    static async loginUserWithOtp(email, otp) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        if (user.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        return { token, user };
    }

    static async verifyOtp(email, otp) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        if (user.otp !== otp) {
            throw new Error('Invalid OTP');
        }

        return true;
    }

    static async sendOtpToEmail(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp;
        await user.save();

        await sendOtp(email, otp);

        return { message: 'OTP sent successfully' };
    }
}

module.exports = AuthService;
