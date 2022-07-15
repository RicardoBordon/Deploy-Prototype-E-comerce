import mongoose from "mongoose";

try {
    mongoose.connect(process.env.URI);
    console.log("conectado a db")
} catch (error) {
    console.log("Error no conectado a db error:"+error);
}

