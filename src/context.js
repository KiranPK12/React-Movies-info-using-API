import React, { useState, useContext, useEffect } from "react";
export const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("avengers");

  const fetchMovies = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if(data.Response === 'True'){
        setMovies(data.Search)
        setError({show:false,msg:''})
      }else{
        setError({show:true,msg:data.Error})
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  return <AppContext.Provider 
  value={{isLoading,error,movies,setQuery,query,setIsLoading,setError}}
  >
  {children}
  </AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
