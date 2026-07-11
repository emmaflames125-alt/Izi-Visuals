import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


import {
  connectDatabase
} from "./src/config.js";


import routes from "./src/routes.js";


import {
  errorHandler
} from "./src/middleware.js";



dotenv.config();



const app = express();





/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/


app.use(

  cors({

    origin:
      process.env.CLIENT_URL,

    credentials:
      true

  })

);



app.use(

  express.json({

    limit:
      "10mb"

  })

);



app.use(

  express.urlencoded({

    extended:true,

    limit:"10mb"

  })

);





/*
|--------------------------------------------------------------------------
| Database
|--------------------------------------------------------------------------
*/


connectDatabase();





/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/


app.use(

  "/api",

  routes

);





/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/


app.get(

  "/",

  (req,res)=>{

    res.json({

      status:"OK",

      message:
        "Izi Visuals API running"

    });

  }

);





/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/


app.use(
  errorHandler
);





/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/


const PORT =
  process.env.PORT || 5000;



mongoose.connection.once(

  "open",

  () => {


    app.listen(

      PORT,

      () => {


        console.log(

          `Server running on port ${PORT}`

        );


      }

    );


  }

);