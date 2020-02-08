import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { MoviedbProvider } from './context/moviedbContext';
import Moviedb from './services/Moviedb';
import ErrorBoundary from './components/ErrorBoundary';

const moviedb = new Moviedb();

ReactDOM.render(
  <MoviedbProvider value={moviedb}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </MoviedbProvider>,
  document.getElementById('root'),
);
