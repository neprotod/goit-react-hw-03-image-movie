/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MoviedbConsumer } from '../context/moviedbContext';

const WithMoviedb = () => Wrapper => props => (
  <MoviedbConsumer>
    {context => <Wrapper moviedb={context} {...props} />}
  </MoviedbConsumer>
);

export default WithMoviedb;
