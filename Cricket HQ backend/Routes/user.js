const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '3d' });
};

// GET User profile
router.get("/:userId", async (req, res) => {
    try {
        // retrieve user by userId
        const userId = req.params.userId;

        // fetch the user
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send the user profile as response
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching user information" });
    }
});

// PUT User Info
router.put("/:userId", async (req, res) => {
    try {
        // update user details by userId
        const userId = req.params.userId;
        const updatedUserInfo = req.body; 

        // update the user info
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInfo);

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send a success response
        return res.status(200).json({ message: "User information updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error updating user information" });
    }
});

// PATCH User Information (Partial update of user details)
router.patch("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUserInfo = req.body;

        // update user profile
        const result = await User.updateOne({ _id: userId }, { $set: updatedUserInfo });

        // Check if the user exists
        if (result.nModified === 0) {
            return res.status(404).json({ error: "User not found or no changes made" });
        }

        // Send a success response
        return res.status(200).json({ message: "User information updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error updating user information" });
    }
});

// DELETE User
router.delete("/:userId", async (req, res) => {
    try {
        //logic to delete a user
        const userId = req.params.userId;

        const deletedUser = await User.findByIdAndDelete(userId);

        // Check if the user exists
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send a success response
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Error deleting user" });
    }
});

module.exports = router;