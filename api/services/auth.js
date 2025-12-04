const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtp } = require('../util/sendOtp');

class AuthService {
  static async registerUser(userData) {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  }

  static async loginUser({ email, password, otp, type }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (type === "password") {
      if (!password) {
        throw new Error("Password is required for password login");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }
    } else if (type === "otp") {
      if (!otp) {
        throw new Error("OTP is required for OTP login");
      }

      if (user.otp !== otp) {
        throw new Error("Invalid OTP");
      }
    } else {
      throw new Error("Invalid login type. Use 'password' or 'otp'");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  static async verifyOtp(email, otp) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    return true;
  }

  static async sendOtpToEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    await sendOtp(email, otp);

    return { message: "OTP sent successfully" };
  }
}

module.exports = AuthService;
