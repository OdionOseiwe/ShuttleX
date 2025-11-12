import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign(
        { userId },                    // payload
        process.env.JWT_SECRET,        // secret key
        { expiresIn: "30m" }            // token lifetime
    );

    // set cookie
    // secure: true in production (HTTPS)
    // must be true to avoid attacks
    // but secure: false in development (HTTP) so allow testing locally
    // through it we can see our cookie in the browser
    res.cookie("auth_token", token, {
        httpOnly: true,                 // protect from XSS
        secure: process.env.NODE_ENV === "production", // use secure cookies in production
        sameSite: "strict",             // protect from CSRF
        maxAge: 30 * 60 * 1000 //30 minutes      // 1 days -> 1 * 24 * 60 * 60 * 1000
    });
    return token;
}
