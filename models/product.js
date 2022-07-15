import mongoose from "mongoose";

//Modelo Creación de Productos
const productSchema = new mongoose.Schema({
    item: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
         required: true,
    },

    image: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        require: true,
        default: 0,
    },

    cstock: {
        type: Number,
        required: true,
        default: 0,
    }
    
});

export const Product = mongoose.model("Product", productSchema);