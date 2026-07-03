import jwt from "jsonwebtoken";

import config from "../../serverConfig.js"

const JWT_SECRET = config.JWT_SECRET;

const AuthHandler = (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;

    if(!token) {
        return res.status(400).json({success: false, message: "Token not found"});
    }

    let tokenDecoded;

    try {
        tokenDecoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log("[Auth Handler]: Error -", error.message);
        return res.status(401).json({success: false, message: "Invalid token"});
    }
    
    req.userId = tokenDecoded.userId;
    next();
}

export default AuthHandler;
