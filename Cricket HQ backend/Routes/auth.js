const router = require("express").Router();
const User = require("../Models/User");
const UserRole = require("../Models/UserRole");
const bcrypt = require("bcrypt");

// Registration Route
router.post("/register", async (req, res) => {
    try {
        const role = await UserRole.findOne({ role: req.body.userRole });

        if (!role) {
            res.status(400).json({ error: "Invalid user role" });
            return;
        }

        const hashedPassword = bcrypt.hash(req.body.password, process.env.SALT_ROUNDS);

        const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        fullName: req.body.fullName,
        userRole: role._id,
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json(error);
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401).json("Wrong user credentials");
            return;
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            res.status(401).json("Wrong password");
            return;
        }
        
        res.status(200).json("Authentication successful");

    } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;