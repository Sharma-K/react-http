import React, {useState,useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      MoviesHandler()
},[])
 async function MoviesHandler(){

  setLoading(true);

    const response =  await fetch('https://swapi.dev/api/films/');

    const data = await response.json();
    console.log(data.results);

    const transformedMovies = data.results.map(movie=> {
      return {
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl
      }
    })
    setMovies(transformedMovies);
    setLoading(false);
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={MoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {loading && <p>Loading...</p> }
        {!loading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
