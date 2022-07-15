import nodemailer from "nodemailer";
import { User } from "../models/user.js";


export const validationEmail = async (email, token) => { 
//creo conexion con servidor de email smtp
const transport = nodemailer.createTransport({
    host: process.env.ML_HOST,
    port: process.env.ML_NAME,
    segure: false,
    auth: {
        user: process.env.ML_USER,
        pass: process.env.ML_PASS,
    }
});

//genero el token a partir de un cod aleatorio y mail  

const link = `<a href=http://localhost:5000/api/v1/confirm/${token}>${token}`;
const emailMsg = {
    to: email,
    from: process.env.ML_USER,
    subject: "VINOTECA",
    html: link
}

//envio mail con token
await transport.sendMail(emailMsg);
};

export const confirmEmail = async (req, res) => {

  const {token} = req.params;
  try {
     const user = await User.findOne({verifiedToken: token});
     if(!user) throw new Error("No existe este usuario");
     user.verifiedOk = true;
     user.verifiedToken = null;   
     await user.save();
     res.json(user.email +": verificado correctamente");
     
  } catch (error) {
     res.json({ error: error.mesagge});
  }
}

