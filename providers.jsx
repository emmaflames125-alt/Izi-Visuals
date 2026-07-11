import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  authAPI,
  settingsAPI
} from "../api/api.js";



/*
|--------------------------------------------------------------------------
| Auth Provider
|--------------------------------------------------------------------------
*/


const AuthContext =
  createContext();



export function AuthProvider({
  children
}) {


  const [
    user,
    setUser
  ] = useState(null);



  const [
    loading,
    setLoading
  ] = useState(true);





  useEffect(() => {


    authAPI.me()

      .then(res => {

        setUser(
          res.data.user
        );

      })

      .catch(() => {

        setUser(null);

      })

      .finally(() => {

        setLoading(false);

      });


  }, []);





  const login =
    async data => {


      const res =
        await authAPI.login(
          data
        );


      setUser(
        res.data.user
      );


      if (res.data.token) {

        localStorage.setItem(
          "izi_access_token",
          res.data.token
        );

      }


      return res.data;

    };





  const register =
    async data => {


      const res =
        await authAPI.register(
          data
        );


      setUser(
        res.data.user
      );


      return res.data;

    };





  const logout =
    async () => {


      await authAPI.logout();


      localStorage.removeItem(
        "izi_access_token"
      );


      setUser(null);


    };





  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        login,

        register,

        logout,

        isAuthenticated:
          !!user

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}





export const useAuth =
  () =>
    useContext(
      AuthContext
    );





/*
|--------------------------------------------------------------------------
| Site Settings Provider
|--------------------------------------------------------------------------
*/


const SettingsContext =
  createContext();



export function SettingsProvider({
  children
}) {


  const [
    settings,
    setSettings
  ] = useState(null);



  useEffect(() => {


    settingsAPI.public()

      .then(res => {

        setSettings(
          res.data.settings
        );

      })

      .catch(() => {

        setSettings(null);

      });


  }, []);





  return (

    <SettingsContext.Provider

      value={{

        settings,

        setSettings

      }}

    >

      {children}

    </SettingsContext.Provider>

  );

}





export const useSettings =
  () =>
    useContext(
      SettingsContext
    );





/*
|--------------------------------------------------------------------------
| Theme Provider
|--------------------------------------------------------------------------
*/


const ThemeContext =
  createContext();



export function ThemeProvider({
  children
}) {


  const [
    theme,
    setTheme
  ] = useState(

    localStorage.getItem(
      "izi_theme"
    )

    ||

    "dark"

  );





  useEffect(() => {


    document.documentElement
      .dataset.theme =
        theme;



    localStorage.setItem(
      "izi_theme",
      theme
    );


  }, [theme]);





  return (

    <ThemeContext.Provider

      value={{

        theme,

        setTheme,

        toggleTheme:
          () =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )

      }}

    >

      {children}

    </ThemeContext.Provider>

  );

}





export const useTheme =
  () =>
    useContext(
      ThemeContext
    );





/*
|--------------------------------------------------------------------------
| Root Provider Wrapper
|--------------------------------------------------------------------------
*/


export default function Providers({
  children
}) {


  return (

    <AuthProvider>

      <SettingsProvider>

        <ThemeProvider>

          {children}

        </ThemeProvider>

      </SettingsProvider>

    </AuthProvider>

  );

}