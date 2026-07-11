import mongoose from "mongoose";

import {
  v2 as cloudinary
} from "cloudinary";



/*
|--------------------------------------------------------------------------
| Database Connection
|--------------------------------------------------------------------------
*/


export async function connectDatabase() {


  try {


    await mongoose.connect(

      process.env.MONGO_URI

    );


    console.log(

      "MongoDB connected"

    );


  }

  catch(error) {


    console.error(

      "Database connection failed:",

      error.message

    );


    process.exit(1);


  }


}





/*
|--------------------------------------------------------------------------
| Cloudinary Configuration
|--------------------------------------------------------------------------
*/


cloudinary.config({

  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,


  api_key:
    process.env.CLOUDINARY_API_KEY,


  api_secret:
    process.env.CLOUDINARY_API_SECRET

});





export {
  cloudinary
};