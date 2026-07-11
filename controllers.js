import {
  User,
  Service,
  Portfolio,
  Booking,
  Payment,
  Message,
  Settings
} from "./models.js";


import {
  hashPassword,
  comparePassword,
  generateToken,
  response
} from "./utils.js";


import {
  sendContactNotification,
  createPaymentIntent
} from "./services.js";





/*
|--------------------------------------------------------------------------
| Authentication Controllers
|--------------------------------------------------------------------------
*/


export async function register(
  req,
  res
) {


  const {
    name,
    email,
    password
  } = req.body;



  const exists =
    await User.findOne({

      email

    });



  if (exists)

    return res.status(400).json({

      message:
        "User already exists"

    });





  const user =
    await User.create({

      name,

      email,

      password:

        await hashPassword(
          password
        )

    });





  response(

    res,

    201,

    {

      user,

      token:

        generateToken(
          user._id
        )

    }

  );

}





export async function login(
  req,
  res
) {


  const {
    email,
    password
  } = req.body;



  const user =
    await User.findOne({

      email

    });



  if (

    !user ||

    !(

      await comparePassword(

        password,

        user.password

      )

    )

  )

    return res.status(401).json({

      message:
        "Invalid credentials"

    });





  response(

    res,

    200,

    {

      user,

      token:

        generateToken(
          user._id
        )

    }

  );

}





export function me(
  req,
  res
) {


  response(

    res,

    200,

    {

      user:req.user

    }

  );

}





/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/


export async function getServices(
  req,
  res
) {


  const services =
    await Service.find();



  response(

    res,

    200,

    {

      services

    }

  );

}





export async function getFeaturedServices(
  req,
  res
) {


  const services =
    await Service.find({

      featured:true

    });



  response(

    res,

    200,

    {

      services

    }

  );

}





/*
|--------------------------------------------------------------------------
| Portfolio
|--------------------------------------------------------------------------
*/


export async function getPortfolio(
  req,
  res
) {


  const projects =
    await Portfolio.find();



  response(

    res,

    200,

    {

      projects

    }

  );

}





export async function getFeaturedPortfolio(
  req,
  res
) {


  const projects =
    await Portfolio.find({

      featured:true

    });



  response(

    res,

    200,

    {

      projects

    }

  );

}





/*
|--------------------------------------------------------------------------
| Booking
|--------------------------------------------------------------------------
*/


export async function createBooking(
  req,
  res
) {


  const booking =
    await Booking.create({

      ...req.body,

      user:req.user._id

    });



  response(

    res,

    201,

    {

      booking

    }

  );

}





export async function getMyBookings(
  req,
  res
) {


  const bookings =
    await Booking.find({

      user:req.user._id

    });



  response(

    res,

    200,

    {

      bookings

    }

  );

}





/*
|--------------------------------------------------------------------------
| Payments
|--------------------------------------------------------------------------
*/


export async function createPayment(
  req,
  res
) {


  const paymentIntent =

    await createPaymentIntent({

      amount:req.body.amount

    });



  response(

    res,

    200,

    {

      clientSecret:

        paymentIntent.client_secret

    }

  );

}





/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
*/


export async function sendMessage(
  req,
  res
) {


  const message =
    await Message.create(

      req.body

    );



  await sendContactNotification(

    message

  );



  response(

    res,

    201,

    {

      message

    }

  );

}





/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/


export async function getSettings(
  req,
  res
) {


  let settings =
    await Settings.findOne();



  if (!settings)

    settings =
      await Settings.create({});





  response(

    res,

    200,

    {

      settings

    }

  );

}





export async function updateSettings(
  req,
  res
) {


  const settings =
    await Settings.findOneAndUpdate(

      {},

      req.body,

      {

        new:true,

        upsert:true

      }

    );



  response(

    res,

    200,

    {

      settings

    }

  );

}





/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/


export async function getAdminStats(
  req,
  res
) {


  const users =
    await User.countDocuments();



  const bookings =
    await Booking.countDocuments();



  const messages =
    await Message.countDocuments();





  response(

    res,

    200,

    {

      users,

      bookings,

      messages

    }

  );

}