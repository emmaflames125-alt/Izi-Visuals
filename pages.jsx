import {
  Link
} from "react-router-dom";

import {
  useState
} from "react";

import {
  Hero,
  Card,
  Button,
  Loader
} from "../components/components.jsx";

import {
  serviceAPI,
  portfolioAPI,
  contactAPI,
  bookingAPI
} from "../api/api.js";

import {
  useFetch
} from "../hooks/hooks.js";



/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/


export function Home() {


  return (

    <>

      <Hero />

      <section>

        <h2>

          Featured Services

        </h2>

      </section>


    </>

  );

}





/*
|--------------------------------------------------------------------------
| About Page
|--------------------------------------------------------------------------
*/


export function About() {


  return (

    <section>

      <h1>

        About Izi Visuals

      </h1>


      <p>

        Creative digital solutions,
        branding and visual experiences.

      </p>


    </section>

  );

}





/*
|--------------------------------------------------------------------------
| Services Page
|--------------------------------------------------------------------------
*/


export function Services() {


  const {
    data,
    loading
  } = useFetch(
    serviceAPI.all
  );





  if (loading)

    return <Loader />;





  return (

    <section>


      <h1>

        Services

      </h1>



      <div>


        {
          data?.services?.map(
            service => (

              <Card

                key={
                  service._id
                }

                title={
                  service.title
                }

                image={
                  service.image
                }

              >

                <p>

                  {
                    service.description
                  }

                </p>


              </Card>

            )

          )
        }


      </div>


    </section>

  );

}





/*
|--------------------------------------------------------------------------
| Portfolio Page
|--------------------------------------------------------------------------
*/


export function Portfolio() {


  const {
    data,
    loading
  } = useFetch(
    portfolioAPI.all
  );





  if (loading)

    return <Loader />;





  return (

    <section>


      <h1>

        Portfolio

      </h1>



      {
        data?.projects?.map(
          item => (

            <Card

              key={
                item._id
              }

              title={
                item.title
              }

              image={
                item.image
              }

            >

              {
                item.description
              }

            </Card>

          )

        )
      }


    </section>

  );

}





/*
|--------------------------------------------------------------------------
| Contact Page
|--------------------------------------------------------------------------
*/


export function Contact() {


  const [
    form,
    setForm
  ] = useState({

    name:"",

    email:"",

    message:""

  });



  const [
    sent,
    setSent
  ] = useState(false);





  async function submit(e) {


    e.preventDefault();



    await contactAPI.send(
      form
    );


    setSent(true);


  }





  if (sent)

    return (

      <h2>

        Message Sent

      </h2>

    );





  return (

    <form onSubmit={submit}>


      <input

        placeholder="Name"

        onChange={
          e =>
          setForm({

            ...form,

            name:e.target.value

          })
        }

      />



      <input

        placeholder="Email"

        onChange={
          e =>
          setForm({

            ...form,

            email:e.target.value

          })
        }

      />



      <textarea

        placeholder="Message"

        onChange={
          e =>
          setForm({

            ...form,

            message:e.target.value

          })
        }

      />



      <Button>

        Send

      </Button>


    </form>

  );

}





/*
|--------------------------------------------------------------------------
| Auth Pages
|--------------------------------------------------------------------------
*/


export function Login() {


  return (

    <section>

      <h1>

        Login

      </h1>


    </section>

  );

}





export function Register() {


  return (

    <section>

      <h1>

        Register

      </h1>


    </section>

  );

}





/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/


export function Dashboard() {


  return (

    <section>

      <h1>

        Dashboard

      </h1>


      <Link to="/dashboard/settings">

        Settings

      </Link>


    </section>

  );

}





/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/


export function Admin() {


  return (

    <section>

      <h1>

        Admin Panel

      </h1>


    </section>

  );

}