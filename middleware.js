import jwt from "jsonwebtoken";

import multer from "multer";



import {
  User
} from "./models.js";





/*
|--------------------------------------------------------------------------
| JWT Authentication Middleware
|--------------------------------------------------------------------------
*/


export async function protect(

  req,

  res,

  next

) {


  try {


    const header =
      req.headers.authorization;



    if (

      !header ||

      !header.startsWith("Bearer")

    ) {


      return res.status(401).json({

        message:
          "Not authorized"

      });


    }





    const token =
      header.split(" ")[1];



    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );





    req.user =
      await User.findById(

        decoded.id

      ).select(

        "-password"

      );





    if (!req.user) {


      return res.status(401).json({

        message:
          "User not found"

      });


    }



    next();


  }

  catch(error) {


    res.status(401).json({

      message:
        "Invalid token"

    });


  }


}





/*
|--------------------------------------------------------------------------
| Admin Authorization Middleware
|--------------------------------------------------------------------------
*/


export function adminOnly(

  req,

  res,

  next

) {


  if (

    req.user &&

    req.user.role === "admin"

  ) {


    return next();


  }





  return res.status(403).json({

    message:
      "Admin access required"

  });


}





/*
|--------------------------------------------------------------------------
| File Upload Middleware
|--------------------------------------------------------------------------
*/


const storage =
  multer.memoryStorage();



export const upload =
  multer({

    storage,


    limits: {

      fileSize:
        5 * 1024 * 1024

    }

  });





/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/


export function errorHandler(

  error,

  req,

  res,

  next

) {


  console.error(

    error

  );



  res.status(

    error.status || 500

  )

  .json({

    message:

      error.message ||

      "Server error"

  });


}