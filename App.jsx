import {
  Routes,
  Route
} from "react-router-dom";


import {
  MainLayout,
  DashboardLayout,
  AdminLayout
} from "./layouts/layouts.jsx";


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
} from "./pages/pages.jsx";


import {
  ProtectedRoute
} from "./components/components.jsx";





/*
|--------------------------------------------------------------------------
| App Component
|--------------------------------------------------------------------------
|
| Main application router.
|
|--------------------------------------------------------------------------
*/


export default function App() {


  return (

    <Routes>



      {/* Public Website */}


      <Route

        element={
          <MainLayout />
        }

      >


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


      </Route>





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





      {/* Dashboard */}


      <Route

        element={

          <ProtectedRoute>

            <DashboardLayout />

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

            <AdminLayout />

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

            404 - Page Not Found

          </h1>

        }

      />


    </Routes>

  );

}