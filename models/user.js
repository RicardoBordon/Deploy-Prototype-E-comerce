import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

//Modelo Creación de Usuarios
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true},
    },

    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    dni: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true, 
    },

    verifiedToken: {
        type: String,
        default: null,
    },

    verifiedOk: {
        type: Boolean,
        default: false,
    }

});

//Hash de contraseña 
userSchema.pre("save", async function (next) {
    const user = this;

    if(!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

//Comprobar contraseña Hasheada
userSchema.methods.comparePassword = async function(clientPassword){
    return await bcryptjs.compare(clientPassword, this.password);
}

export const User = mongoose.model("User", userSchema);
