import {v2 as cloudinary} from "cloudinary"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const deleteCloudinary = async (publicId) => {
    try {
        if (!publicId) return null
        //delete the file on cloudinary
        const response = await cloudinary.uploader.destroy(publicId)
        // file has been deleted successfull
        //console.log("file is deleted on cloudinary ", response);
        return response;

    } catch (error) {
        return null;
    }
}


export {deleteCloudinary} ;