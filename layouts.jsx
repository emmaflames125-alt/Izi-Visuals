import {
  Outlet
} from "react-router-dom";


import {
  Navbar,
  Footer
} from "../components/components.jsx";



/*
|--------------------------------------------------------------------------
| Main Website Layout
|--------------------------------------------------------------------------
|
| Wraps all public pages.
|
|--------------------------------------------------------------------------
*/


export function MainLayout() {


  return (

    <>

      <Navbar />


      <main>

        <Outlet />

      </main>


      <Footer />


    </>

  );

}





/*
|--------------------------------------------------------------------------
| Dashboard Layout
|--------------------------------------------------------------------------
|
| Wraps authenticated dashboard pages.
|
|--------------------------------------------------------------------------
*/


export function DashboardLayout() {


  return (

    <>

      <Navbar />


      <main className="dashboard-layout">

        <Outlet />

      </main>


    </>

  );

}





/*
|--------------------------------------------------------------------------
| Admin Layout
|--------------------------------------------------------------------------
|
| Wraps administrator pages.
|
|--------------------------------------------------------------------------
*/


export function AdminLayout() {


  return (

    <>

      <Navbar />


      <main className="admin-layout">

        <Outlet />

      </main>


    </>

  );

}