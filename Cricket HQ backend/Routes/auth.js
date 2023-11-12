const router = require("express").Router();
const User = require("../Models/User");
const UserRole = require("../Models/UserRole");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, process.env.SECRET_KEY, { expiresIn: '3d' });
};

// Registration Route
router.post("/register", async (req, res) => {
    try {
        const role = await UserRole.findOne({ role: req.body.userRole });

        if (!role) {
            return res.status(400).json({ error: "Invalid user role" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            fullName: req.body.fullName,
            userRole: role._id,
        });

        const savedUser = await newUser.save();

        // Create a JWT token with the user's ID and role
        const token = createToken(savedUser._id, req.body.userRole);

        res.status(200).json({ userId: savedUser._id, token });

    } catch (error) {
        res.status(500).json(error);
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401).json({ error: "Wrong user credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Wrong password" });
            return;
        }

        // Create a JWT token with the user's ID and role
        const token = createToken(user._id, user.userRole);

        res.status(200).json({ userId: user._id, token });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;