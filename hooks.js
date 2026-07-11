import {
  useEffect,
  useState
} from "react";



/*
|--------------------------------------------------------------------------
| Generic Fetch Hook
|--------------------------------------------------------------------------
*/


export function useFetch(
  fetcher,
  dependencies = []
) {


  const [
    data,
    setData
  ] = useState(null);



  const [
    loading,
    setLoading
  ] = useState(true);



  const [
    error,
    setError
  ] = useState(null);





  const execute =
    async () => {


      try {


        setLoading(true);

        setError(null);



        const result =
          await fetcher();



        setData(
          result.data
        );


      }
      catch(err) {


        setError(
          err
        );


      }
      finally {


        setLoading(false);


      }


    };





  useEffect(() => {


    execute();


  }, dependencies);





  return {

    data,

    loading,

    error,

    refetch:
      execute

  };

}





/*
|--------------------------------------------------------------------------
| Debounce Hook
|--------------------------------------------------------------------------
*/


export function useDebounce(
  value,
  delay = 500
) {


  const [
    result,
    setResult
  ] = useState(value);





  useEffect(() => {


    const timer =
      setTimeout(

        () =>
          setResult(
            value
          ),

        delay

      );



    return () =>
      clearTimeout(
        timer
      );


  }, [

    value,

    delay

  ]);





  return result;

}





/*
|--------------------------------------------------------------------------
| Local Storage Hook
|--------------------------------------------------------------------------
*/


export function useLocalStorage(
  key,
  initialValue
) {


  const [
    value,
    setValue
  ] = useState(() => {


    const stored =
      localStorage.getItem(
        key
      );


    return stored

      ?

      JSON.parse(
        stored
      )

      :

      initialValue;


  });





  const update =
    newValue => {


      setValue(
        newValue
      );


      localStorage.setItem(

        key,

        JSON.stringify(
          newValue
        )

      );


    };





  return [

    value,

    update

  ];

}