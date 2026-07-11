import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import {
  Home,
  About,
  Services,
  Portfolio,
  Contact,
  Login,
  Register,
  Dashboard,
  Admin
} from "../pages/pages.jsx";


import {
  ProtectedRoute
} from "../components/components.jsx";





export default function AppRoutes() {


  return (

    <BrowserRouter>


      <Routes>


        {/* Public Routes */}

        <Route

          path="/"

          element={
            <Home />
          }

        />


        <Route

          path="/about"

          element={
            <About />
          }

        />


        <Route

          path="/services"

          element={
            <Services />
          }

        />


        <Route

          path="/portfolio"

          element={
            <Portfolio />
          }

        />


        <Route

          path="/contact"

          element={
            <Contact />
          }

        />





        {/* Authentication */}


        <Route

          path="/login"

          element={
            <Login />
          }

        />


        <Route

          path="/register"

          element={
            <Register />
          }

        />





        {/* Client Dashboard */}


        <Route

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        >

          <Route

            path="/dashboard"

            element={
              <Dashboard />
            }

          />

        </Route>





        {/* Admin */}


        <Route

          element={

            <ProtectedRoute

              role="admin"

            >

              <Admin />

            </ProtectedRoute>

          }

        >


          <Route

            path="/admin"

            element={
              <Admin />
            }

          />


        </Route>





        {/* 404 */}


        <Route

          path="*"

          element={

            <h1>

              Page Not Found

            </h1>

          }

        />


      </Routes>


    </BrowserRouter>

  );

}