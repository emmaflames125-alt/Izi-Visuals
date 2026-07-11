import mongoose from "mongoose";



const {
  Schema,
  model
} = mongoose;



/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
*/


const UserSchema = new Schema(

{

  name: {

    type:String,

    required:true

  },


  email: {

    type:String,

    required:true,

    unique:true

  },


  password: {

    type:String,

    required:true

  },


  role: {

    type:String,

    default:"user"

  }


},

{

  timestamps:true

}

);





/*
|--------------------------------------------------------------------------
| Service Model
|--------------------------------------------------------------------------
*/


const ServiceSchema = new Schema(

{

  title:String,

  description:String,

  image:String,

  price:Number,


  featured: {

    type:Boolean,

    default:false

  }


},

{

  timestamps:true

}

);





/*
|--------------------------------------------------------------------------
| Portfolio Model
|--------------------------------------------------------------------------
*/


const PortfolioSchema = new Schema(

{

  title:String,

  description:String,

  image:String,


  category:String,


  featured: {

    type:Boolean,

    default:false

  }

},

{

  timestamps:true

}

);





/*
|--------------------------------------------------------------------------
| Booking Model
|--------------------------------------------------------------------------
*/


const BookingSchema = new Schema(

{

  user: {

    type:Schema.Types.ObjectId,

    ref:"User"

  },


  service: {

    type:Schema.Types.ObjectId,

    ref:"Service"

  },


  date:Date,


  status: {

    type:String,

    default:"pending"

  }


},

{

  timestamps:true

}

);





/*
|--------------------------------------------------------------------------
| Payment Model
|--------------------------------------------------------------------------
*/


const PaymentSchema = new Schema(

{

  user: {

    type:Schema.Types.ObjectId,

    ref:"User"

  },


  booking: {

    type:Schema.Types.ObjectId,

    ref:"Booking"

  },


  amount:Number,


  status: {

    type:String,

    default:"pending"

  },


  paymentId:String


},

{

  timestamps:true

}

);





/*
|--------------------------------------------------------------------------
| Contact Message Model
|--------------------------------------------------------------------------
*/


const MessageSchema = new Schema(

{

  name:String,


  email:String,


  phone:String,


  message:String,


  read: {

    type:Boolean,

    default:false

  }


},

{

  timestamps:true

}

);





/*
|--------------------------------------------------------------------------
| Website Settings Model
|--------------------------------------------------------------------------
*/


const SettingsSchema = new Schema(

{

  siteName: {

    type:String,

    default:
      "Izi Visuals"

  },


  logo:String,


  heroTitle:String,


  heroDescription:String,


  aboutShort:String,


  aboutLong:String,


  email:String,


  phone:String,


  address:String,


  facebook:String,


  instagram:String,


  linkedin:String,


  x:String


},

{

  timestamps:true

}

);





export const User =
  model(
    "User",
    UserSchema
  );


export const Service =
  model(
    "Service",
    ServiceSchema
  );


export const Portfolio =
  model(
    "Portfolio",
    PortfolioSchema
  );


export const Booking =
  model(
    "Booking",
    BookingSchema
  );


export const Payment =
  model(
    "Payment",
    PaymentSchema
  );


export const Message =
  model(
    "Message",
    MessageSchema
  );


export const Settings =
  model(
    "Settings",
    SettingsSchema
  );