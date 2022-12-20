import React, {useState,useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
      MoviesHandler();
},[]);

//useCallback is used to call the function when there is change in them
 const MoviesHandler = useCallback(async()=>{

  setError(null);

  setLoading(true);

  try
    {
      const response =  await fetch('https://swapi.dev/api/films/');

    const data = await response.json();
    

    const transformedMovies = data.results.map(movie=> {
      return {
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl
      }
    })
    setMovies(transformedMovies);
  }catch(error)
  {
    setError('Something Went Wrong');
  }
    setLoading(false);
 })

  return (
    <React.Fragment>
      <section>
        <button onClick={MoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        
        {loading && !error && <p>Loading...</p> }
        {!loading && !error && <MoviesList movies={movies} />}
        {error && <p>{error}</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
