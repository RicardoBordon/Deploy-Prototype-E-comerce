import { Product } from "../models/product.js";
import { destroyImage } from "../helpers/destroyImage.js";
import uploadImage from "../helpers/uploadImage.js";
import cloudinary  from 'cloudinary';

//CREAR PRODUCTO
export const createProduct = async (req, res) => {
  console.log("fileeeee",req.file);
  console.log("bodyyyyy",req.body);
  const { item, name, description, price, cstock } = req.body;

  try {

    const image = await uploadImage(req.file.path);
    // console.log(cloudinary.image(image, {secure: true}))

    const product = new Product({ item, name, image, description, price, cstock });


    await product.save();

    return res.status(201).json({ ok: "guardado en db" });

  } catch (error) {
    return res.status(400).json({ ok: "error" });;
  }
};

// ACTUALIZAR PRODUCTO
export const updateProduct = async (req, res) => {
  console.log("fileeeee",req.file);
  console.log("bodyyyyy",req.body);
  const { item, name, description, price, cstock } = req.body;
  // const product = await Product.updateOne({ item: req.params.item });
  const productArray = await Product.find({ item: req.params.item });
  const product = productArray[0];
  console.log(product)
  let image = 'undefined';

  if (req.file) {
    console.log("img nueva cambio imagen borro anterior")
    await destroyImage(product.image);
    image = await uploadImage(req.file.path);
  }
  else {
    console.log("nada nuevo")
  }

  if (product) {
    if(item !== 'undefined') product.item = item;
    if(name !== 'undefined') product.name = name;
    if(description !== 'undefined') product.description = description;
    if(price !== 'undefined') product.price = price;
    if(cstock !== 'undefined')product.cstock = cstock;
    if(image !== 'undefined')product.image = image;
    console.log(product);
    await Product.findOneAndUpdate({item: product.item},product)
    // await Product.updateOne(product);
    return res.status(201).json({ ok: "Actualizado" });
  } else {
     return res.status(400).json({ ok: "error" });
  }
};


//BORRAR PRODRUCTO 
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.find({ item: req.params.item });
    if (product) {
      await Product.deleteOne({ item: req.params.item })
      await destroyImage(product[0].image);
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
   } catch (error) {
    console.log(error);
  }
}


//MOSTRAR TODOS LOS PRODUCTOS
export const allProducts = async (req, res) => {
  try {
    //Obtengo la url completa a traves de public_id y lo sobreescribo en la variable en memoria 
    //sin tocar la base de datos

    const product = await Product.find({});
    async function showUrl(){ 
    product.forEach(item => item.image = cloudinary.url(item.image, {secure: true}));
    }
    await showUrl();
    // product.forEach(item => item.image = cloudinary.image(item.image, {secure: true})); 

    // product[0].image = cloudinary.image(product[0].image, {secure: true});
    // console.log(image);
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
}

//MOSTRAR UN PRODUCTO

export const singleProduct = async (req, res) => {
  try {
    const product = await Product.find({ item: req.params.item });
    // console.log(product[0].image);
    product[0].image = cloudinary.url(product[0].image, {secure: true});
    return res.json(product);
  } catch (error) {
    console.error;
  }
}
