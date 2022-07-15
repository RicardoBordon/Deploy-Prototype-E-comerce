import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const generateToken = (uid) => {

    const expiresIn = 60*60;
    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn});
        return {token, expiresIn};
    } catch (error) {
        console.log(error);
    }
}

export const generateTokenAdmin = (uid) => {

    const expiresIn = 60*60;
    try {
        const tokenAdmin = jwt.sign({uid}, process.env.JWT_ADMIN, {expiresIn});
        return {tokenAdmin, expiresIn};
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {
        expiresIn,
    });

        
        res.cookie("refreshToken", refreshToken, {
            // sameSite: 'strict',
            // path: '/',
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        })
        // .send("cookie being initialised");

    } catch (error) {
        console.log(error);
    }
}