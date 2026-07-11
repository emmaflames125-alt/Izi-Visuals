import {
  Link,
  NavLink
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import {
  FiMenu,
  FiX,
  FiUser,
  FiArrowRight
} from "react-icons/fi";

import {
  useState
} from "react";

import {
  useAuth,
  useSettings
} from "../context/providers.jsx";



/*
|--------------------------------------------------------------------------
| Navbar
|--------------------------------------------------------------------------
*/


export function Navbar() {


  const [
    open,
    setOpen
  ] = useState(false);


  const {
    user
  } = useAuth();


  const {
    settings
  } = useSettings();





  const links = [

    ["Home", "/"],

    ["Services", "/services"],

    ["Portfolio", "/portfolio"],

    ["Contact", "/contact"]

  ];





  return (

    <header className="navbar">

      <Link to="/">

        {
          settings?.siteName ||
          "Izi Visuals"
        }

      </Link>



      <button

        onClick={() =>
          setOpen(!open)
        }

      >

        {
          open
          ?
          <FiX />
          :
          <FiMenu />
        }

      </button>



      <nav className={
        open
        ?
        "open"
        :
        ""
      }>


        {
          links.map(
            link => (

              <NavLink

                key={
                  link[1]
                }

                to={
                  link[1]
                }

              >

                {
                  link[0]
                }

              </NavLink>

            )

          )
        }



        <Link to={
          user
          ?
          "/dashboard"
          :
          "/login"
        }>

          <FiUser />

          {
            user
            ?
            "Dashboard"
            :
            "Login"
          }

        </Link>


      </nav>


    </header>

  );

}





/*
|--------------------------------------------------------------------------
| Footer
|--------------------------------------------------------------------------
*/


export function Footer() {


  const {
    settings
  } = useSettings();





  return (

    <footer>


      <h3>

        {
          settings?.siteName ||
          "Izi Visuals"
        }

      </h3>


      <p>

        {
          settings?.email
        }

      </p>



      <p>

        © {
          new Date()
            .getFullYear()
        }

      </p>


    </footer>

  );

}





/*
|--------------------------------------------------------------------------
| Button
|--------------------------------------------------------------------------
*/


export function Button({

  children,

  loading,

  ...props

}) {


  return (

    <motion.button

      whileTap={{
        scale:.95
      }}

      disabled={loading}

      {...props}

    >

      {
        loading
        ?
        "Loading..."
        :
        children
      }

    </motion.button>

  );

}





/*
|--------------------------------------------------------------------------
| Card
|--------------------------------------------------------------------------
*/


export function Card({

  title,

  image,

  children

}) {


  return (

    <motion.article

      whileHover={{
        y:-5
      }}

      className="card"

    >


      {
        image &&

        <img

          src={image}

          alt={title}

        />

      }



      <h3>

        {title}

      </h3>



      {children}


    </motion.article>

  );

}





/*
|--------------------------------------------------------------------------
| Loader
|--------------------------------------------------------------------------
*/


export function Loader() {


  return (

    <div className="loader">

      Loading...

    </div>

  );

}





/*
|--------------------------------------------------------------------------
| Hero Section
|--------------------------------------------------------------------------
*/


export function Hero() {


  const {
    settings
  } = useSettings();





  return (

    <section className="hero">


      <h1>

        {
          settings?.heroTitle ||
          "Creative Digital Solutions"
        }

      </h1>



      <p>

        {
          settings?.heroDescription
        }

      </p>



      <Link to="/contact">

        Start Project

        <FiArrowRight />

      </Link>


    </section>

  );

}





/*
|--------------------------------------------------------------------------
| Protected Route
|--------------------------------------------------------------------------
*/


export function ProtectedRoute({

  children,

  role

}) {


  const {
    user
  } = useAuth();





  if (!user)

    return <Link to="/login">
      Login
    </Link>;





  if (

    role &&

    user.role !== role

  )

    return null;





  return children;

}