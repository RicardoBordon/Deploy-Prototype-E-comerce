import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if(!token) throw new Error("No es formato Bearer");
        
        token = token.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = payload.uid;

        next();
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
    
}

export const requireAdminToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if(!token) throw new Error("No es formato Bearer");
        
        token = token.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_ADMIN);
        req.uid = payload.uid;

        next();
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
    
}