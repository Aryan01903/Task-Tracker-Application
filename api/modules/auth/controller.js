const AuthService = require('../services/auth');

class AuthController {

    static async register(req, res) {
        try {
            const docData = req.body;
            const newUser = await UserService.register(docData);
            res.status(201).json({ message: 'User registered successfully', data: newUser });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async loginWithPassword(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await UserService.login(email, password);
            res.status(200).json({ message: 'Login successful', token, user });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async loginWithOtp(req, res) {
        try {
            const { email, otp } = req.body;
            const { token, user } = await UserService.loginWithOtp(email, otp);
            res.status(200).json({ message: 'Login successful', token, data: user });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async sendOtp(req, res) {
        try {
            const { email } = req.body;
            const result = await UserService.sendOtp(email);
            res.status(200).json({data: result});
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            await UserService.verifyOtp(email, otp);
            res.status(200).json({ message: 'OTP verified successfully' });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
