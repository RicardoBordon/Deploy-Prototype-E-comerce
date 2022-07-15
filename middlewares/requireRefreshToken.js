import Jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.token;
        console.log(req.cookies.refreshtoken);
        // let refreshTokenCookie = req.headers?.authorization;
        if(!refreshTokenCookie) throw new Error("No existe el token");
        // refreshTokenCookie = refreshTokenCookie.split(" ")[1];

        const { uid } = Jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
};