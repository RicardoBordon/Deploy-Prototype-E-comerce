import cloudinary  from 'cloudinary';


const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
    try{
        const result = await cloudinary.v2.uploader.upload(imagePath, options);
        return result.public_id;
        // return result.secure_url;
    }  
    catch (error){
        console.log(error);
    }
};

export default uploadImage