import { User } from "../models/user.js";
import { generateToken, generateRefreshToken, generateTokenAdmin } from "../helpers/generateToken.js";
import { confirmEmail, validationEmail } from "../middlewares/ValidationMail.js";

//Registro de usuarios
export const register = async(req, res) => {
    const {name, lastName, dni, phone, email, password} = req.body;
    try {
        const user= new User({name, lastName, dni, phone, email, password});
        //jwt token, generación token
        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res);
        validationEmail(user.email, token);
        user.verifiedToken = token;

        await user.save();
        
        return res.status(201).json({ok: "guardado en db", token, expiresIn});
    } catch (error) {
        console.log(error);
        if(error.code === 11000){
            return res.status(400).json({error: "Ya existe este usuario"});
        }
        return res.status(500).json({error: "Servidor no econtrado"});
    }
};

//Login de usuarios
export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
         
        //Buscar con metodos de mongoose el Email en la db
        let user = await User.findOne({email});
        if(!user)return res.status(403).json({error: "No existe el usuario"});     
        

        //Con mongoose obtener un booleano en caso de encontrar la password hasheada    
        const resPassword = await user.comparePassword(password);
        if(!resPassword){
            return res.status(403).json({error: "Contraseña incorrecta"});
        }

        if(!user.verifiedOk) return res.status(403).json({error: "Cuenta de correo no confirmada"})
        
        if(email !== process.env.ADMIN && password !== process.env.PASSADMIN){
        // Generar el token JWT
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res);
        
        return res.json({token, expiresIn});
    }
    else{
        const { tokenAdmin, expiresIn } = generateTokenAdmin(user.id);
        generateRefreshToken(user.id, res);
        return res.json({tokenAdmin, expiresIn});
    }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Servidor no econtrado"});
    }
};

export const refreshToken = (req, res) => {
    try {
        const {token , expiresIn} = generateToken(req.uid);
        return res.json( {token, expiresIn});
        
    } catch (error) {
        console.log(error);
    }
  
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ok: true});      
};