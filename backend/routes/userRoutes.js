const express = require("express");
const User = require("../models/User");

const {
    REGISTER_ROUTE,
    USERS_ROUTE
} = require("../constants/constants");

const router = express.Router();
// POST /api/register
router.post(REGISTER_ROUTE, async (req, res) => {
    try {
        const { name, phone, email, city, state } = req.body;

        if (!name || !phone || !email || !city || !state) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists"
            });
        }

        const newUser = new User({
            name,
            phone,
            email,
            city,
            state
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: savedUser
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while registering user"
        });
    }
});


// GET /api/users
router.get(USERS_ROUTE, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });

    } catch (error) {
        console.error("Fetching users error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching users"
        });
    }
});

module.exports = router;