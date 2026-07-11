import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";





/*
|--------------------------------------------------------------------------
| Password Hashing
|--------------------------------------------------------------------------
*/


export async function hashPassword(

  password

) {


  return await bcrypt.hash(

    password,

    12

  );

}





/*
|--------------------------------------------------------------------------
| Password Comparison
|--------------------------------------------------------------------------
*/


export async function comparePassword(

  password,

  hashedPassword

) {


  return await bcrypt.compare(

    password,

    hashedPassword

  );

}





/*
|--------------------------------------------------------------------------
| JWT Generator
|--------------------------------------------------------------------------
*/


export function generateToken(

  id

) {


  return jwt.sign(

    {

      id

    },

    process.env.JWT_SECRET,

    {

      expiresIn:

        process.env.JWT_EXPIRE ||

        "7d"

    }

  );

}





/*
|--------------------------------------------------------------------------
| API Response Helper
|--------------------------------------------------------------------------
*/


export function response(

  res,

  status,

  data,

  message = "Success"

) {


  return res.status(

    status

  )

  .json({

    success:true,

    message,

    data

  });

}





/*
|--------------------------------------------------------------------------
| Async Error Wrapper
|--------------------------------------------------------------------------
*/


export function asyncHandler(

  callback

) {


  return (

    req,

    res,

    next

  ) => {


    Promise.resolve(

      callback(

        req,

        res,

        next

      )

    )

    .catch(

      next

    );


  };


}





/*
|--------------------------------------------------------------------------
| Pagination Helper
|--------------------------------------------------------------------------
*/


export function paginate(

  page = 1,

  limit = 10

) {


  return {

    skip:

      (

        Number(page) - 1

      )

      *

      Number(limit),


    limit:

      Number(limit)

  };

}