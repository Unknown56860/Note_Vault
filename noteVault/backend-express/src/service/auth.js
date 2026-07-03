import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../serverConfig.js";

import * as UsersRepo from "../database/mongo/controller/users.js";
import { getNotesByUser } from "../database/mongo/controller/notes.js";

const JWT_SECRET = config.JWT_SECRET;

export const registerUser = async (name, email, password) => {
    const user = await UsersRepo.getUserByEmail(email);

    if(user) { return null; }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {name: name, email: email, password: hashedPassword};
    return await UsersRepo.createUser(newUser);
}

export const verifyCredentials =  async (email, password) => {
    const user = await UsersRepo.getUserByEmail(email);

    if(!user) { return null; }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch) { return null; }
    
    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "7d"});
    return token;
}

export const getProfile = async (userId) => {
    const user = await UsersRepo.getUser(userId);

    if(!user) { return null; }

    const notes = await getNotesByUser(userId);
    const notesCount = notes ? notes.length : 0;

    const profile = {
        id: user._id, name: user.name, email: user.email, 
        createdAt: user.createdAt, updatedAt: user.updatedAt,
        notesCount: notesCount
    };
    return (profile);
}

export const updateProfile = async (userId, name, email, password) => {
    try {
        const user = await UsersRepo.getUser(userId);
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const newInfo = {
            name: name ? name : user.name, 
            email: email ? email : user.email, 
            password: hashedPassword ? hashedPassword : user.password
        };

        return await UsersRepo.updateUser(userId, newInfo);
    } catch (error) {
        console.log("[Auth Service]: Error,", error.message);
    }
    return null;
}

export const deleteProfile = async (userId) => {
    try {
        return await UsersRepo.deleteUser(userId);
    } catch (error) {
        console.log("[Auth Service}: Error,", error.message);
    }
    return null;
}

