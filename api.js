import axios from "axios";


const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  withCredentials: true,

});



api.interceptors.request.use(

  config => {

    const token =
      localStorage.getItem(
        "izi_access_token"
      );


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  error =>
    Promise.reject(error)

);



export const authAPI = {

  login:
    data =>
      api.post(
        "/auth/login",
        data
      ),

  register:
    data =>
      api.post(
        "/auth/register",
        data
      ),

  logout:
    () =>
      api.post(
        "/auth/logout"
      ),

  me:
    () =>
      api.get(
        "/auth/me"
      )

};



export const serviceAPI = {

  all:
    params =>
      api.get(
        "/services",
        {
          params
        }
      ),

  featured:
    () =>
      api.get(
        "/services/featured"
      )

};



export const portfolioAPI = {

  all:
    params =>
      api.get(
        "/portfolio",
        {
          params
        }
      ),

  featured:
    () =>
      api.get(
        "/portfolio/featured"
      )

};



export const bookingAPI = {

  create:
    data =>
      api.post(
        "/bookings",
        data
      ),

  mine:
    () =>
      api.get(
        "/bookings/my"
      )

};



export const paymentAPI = {

  create:
    data =>
      api.post(
        "/payments",
        data
      ),

  history:
    () =>
      api.get(
        "/payments/my"
      )

};



export const contactAPI = {

  send:
    data =>
      api.post(
        "/contact",
        data
      )

};



export const settingsAPI = {

  public:
    () =>
      api.get(
        "/settings/public"
      ),

  update:
    data =>
      api.put(
        "/settings",
        data
      )

};



export const adminAPI = {

  users:
    () =>
      api.get(
        "/admin/users"
      ),

  analytics:
    () =>
      api.get(
        "/admin/analytics"
      )

};



export default api;