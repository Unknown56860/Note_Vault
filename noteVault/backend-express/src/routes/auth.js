import express from "express";

import AuthHandler from "../middleware/jwtAuthHandler.js";

import * as authService from "../service/auth.js";
import { deleteAllNotes } from "../service/notes.js";

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!name || !email || !password) {
        return res.status(400).json({success: false, message: "Incomplete profile data"});
    }

    const newUser = await authService.registerUser(name, email, password);

    if(!newUser) {
        return res.status(409).json({success: false, message: "User already exists"});
    }

    return res.status(201).json({success: true, message: "Registration successful"});
});

authRouter.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(400).json({success: false, message: "Incomplete credentials"});
    }

    const token = await authService.verifyCredentials(email, password);

    if(!token) {
        return res.status(401).json({success: false, message: "Invalid credentials"});
    }

    res.cookie('token', token, {
        httpOnly: true, secure: true, sameSite: 'none', partitioned:true, maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({success: true, message: "Login successful"});
});

authRouter.get('/logout', async (req, res) => {
    res.cookie('token', "", {
        httpOnly: true, secure: true, sameSite: 'none', partitioned:true, maxAge: 100
    })

    return res.status(200).json({success: true, message: "Logout successful"});
})

authRouter.get('/profile', AuthHandler, async (req, res) => {
    const userId = req.userId;
    const profile = await authService.getProfile(userId);
    if(!profile) {
        return res.status(404).json({success: false, message: "Profile not found"});
    }
    return res.status(200).json({success: true, profile: profile});
});

authRouter.put('/update-profile', AuthHandler, async (req, res) => {
    const userId = req.userId;

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const updatedProfile = await authService.updateProfile(userId, name, email, password);
    if(!updatedProfile) {
        return res.status(500).json({success: false, message: "Failed to update profile"});
    }
    return res.status(200).json({success: true, message: "Profile updated successfully"});
});

authRouter.delete('/delete-profile', AuthHandler, async (req, res) => {
    const userId = req.userId;

    const deletedProfile = await authService.deleteProfile(userId);
    const deletedNotes = await deleteAllNotes(userId);

    if(!deletedProfile) {
        return res.status(500).json({success: false, message: "Profile deletion failed"});
    }

    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none', path: '/' });
    if(!deletedNotes) {
        return res.status(202).json({success: true, message: "Profile will be deleted shortly"});
    }
    return res.status(200).json({success: true, message: "Profile deleted successfully"});
});

export default authRouter;
