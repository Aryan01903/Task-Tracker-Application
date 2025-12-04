const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = {
            id: decoded.userId,
            email: decoded.email
        };

        next();

    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;
