const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { UserModel} = require("../db");
// const { JWT_USER_SECRET } = require("../config");

const userRouter = Router();

const JWT_USER_SECRET = "12345"

userRouter.post("/signup", async function (req, res) {
    const requiredBodyFormat = z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string()
    });

    const inputValidation = requiredBodyFormat.safeParse(req.body);

    if (!inputValidation.success) {
        return res.status(400).json({
            message: "Incorrect Input",
            error: inputValidation.error
        });
    }

    const { username, email, password } = req.body;

    try {
        const hashedpassword = await bcrypt.hash(password, 5);
        await UserModel.create({
            username, email, password:hashedpassword
        });
        return res.json({
            message: "Your account has been created"
        });
    } catch (e) {
        return res.status(500).json({
            message: "There is an error",
            error: e.message
        });
    }
});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
        const token = jwt.sign(
            { id: user._id.toString() },
            JWT_USER_SECRET
        );
        return res.json({ token });
    } else {
        return res.status(403).json({ msg: "Incorrect Credentials" });
    }
});

const axios = require("axios");

userRouter.post("/google-login", async function (req, res) {
    const { token } = req.body;
    try {
        // Verify access token by fetching user info from Google
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const { email, name } = userInfoResponse.data;

        if (!email) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            // Create user with a dummy secure password since it's required by schema
            const crypto = require("crypto");
            const dummyPassword = crypto.randomBytes(16).toString("hex");
            const hashedpassword = await bcrypt.hash(dummyPassword, 5);
            user = await UserModel.create({
                username: name || email.split('@')[0],
                email: email,
                password: hashedpassword
            });
        }

        const jwtToken = jwt.sign(
            { id: user._id.toString() },
            JWT_USER_SECRET
        );

        return res.json({ 
            message: "Google login successful",
            token: jwtToken 
        });

    } catch (error) {
        console.error("Google login error:", error.response?.data || error.message);
        res.status(400).json({ message: "Invalid Google token" });
    }
});

module.exports = {userRouter};