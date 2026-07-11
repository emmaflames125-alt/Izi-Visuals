import {
  Router
} from "express";


import {

  register,

  login,

  me,

  getServices,

  getFeaturedServices,

  getPortfolio,

  getFeaturedPortfolio,

  createBooking,

  getMyBookings,

  createPayment,

  sendMessage,

  getSettings,

  updateSettings,

  getAdminStats

} from "./controllers.js";



import {

  protect,

  adminOnly

} from "./middleware.js";





const router =
  Router();





/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/


router.post(

  "/auth/register",

  register

);



router.post(

  "/auth/login",

  login

);



router.get(

  "/auth/me",

  protect,

  me

);





/*
|--------------------------------------------------------------------------
| Services Routes
|--------------------------------------------------------------------------
*/


router.get(

  "/services",

  getServices

);



router.get(

  "/services/featured",

  getFeaturedServices

);





/*
|--------------------------------------------------------------------------
| Portfolio Routes
|--------------------------------------------------------------------------
*/


router.get(

  "/portfolio",

  getPortfolio

);



router.get(

  "/portfolio/featured",

  getFeaturedPortfolio

);





/*
|--------------------------------------------------------------------------
| Booking Routes
|--------------------------------------------------------------------------
*/


router.post(

  "/bookings",

  protect,

  createBooking

);



router.get(

  "/bookings/my",

  protect,

  getMyBookings

);





/*
|--------------------------------------------------------------------------
| Payment Routes
|--------------------------------------------------------------------------
*/


router.post(

  "/payments",

  protect,

  createPayment

);





/*
|--------------------------------------------------------------------------
| Contact Routes
|--------------------------------------------------------------------------
*/


router.post(

  "/contact",

  sendMessage

);





/*
|--------------------------------------------------------------------------
| Settings Routes
|--------------------------------------------------------------------------
*/


router.get(

  "/settings/public",

  getSettings

);



router.put(

  "/settings",

  protect,

  adminOnly,

  updateSettings

);





/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/


router.get(

  "/admin/analytics",

  protect,

  adminOnly,

  getAdminStats

);





export default router;