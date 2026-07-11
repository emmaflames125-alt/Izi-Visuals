import nodemailer from "nodemailer";

import Stripe from "stripe";





/*
|--------------------------------------------------------------------------
| Email Service
|--------------------------------------------------------------------------
*/


const transporter =
  nodemailer.createTransport({

    host:
      process.env.SMTP_HOST,


    port:
      process.env.SMTP_PORT,


    secure:false,


    auth: {

      user:
        process.env.SMTP_USER,


      pass:
        process.env.SMTP_PASSWORD

    }

  });





export async function sendEmail({

  to,

  subject,

  text,

  html

}) {


  return await transporter.sendMail({

    from:

      process.env.SMTP_USER,


    to,


    subject,


    text,


    html

  });


}





/*
|--------------------------------------------------------------------------
| Contact Notification Email
|--------------------------------------------------------------------------
*/


export async function sendContactNotification(

  message

) {


  return sendEmail({

    to:

      process.env.SMTP_USER,


    subject:

      "New Website Contact Message",


    text:

      `

Name:

${message.name}


Email:

${message.email}


Message:

${message.message}

      `

  });


}





/*
|--------------------------------------------------------------------------
| Stripe Payment Service
|--------------------------------------------------------------------------
*/


const stripe =
  new Stripe(

    process.env.STRIPE_SECRET_KEY

  );





export async function createPaymentIntent({

  amount,

  currency = "usd"

}) {


  const paymentIntent =

    await stripe.paymentIntents.create({

      amount:


        Math.round(

          amount * 100

        ),


      currency,


      automatic_payment_methods: {

        enabled:true

      }

    });





  return paymentIntent;

}





/*
|--------------------------------------------------------------------------
| Upload Helper Placeholder
|--------------------------------------------------------------------------
|
| Cloudinary upload logic can be
| added here when using uploads.
|
|--------------------------------------------------------------------------
*/


export async function uploadFile(

  file

) {


  return {

    url:

      file.path ||

      ""

  };


}