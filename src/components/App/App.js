/* eslint-disable no-alert */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage, Error404, DetailPage, MoviePage } from '../Page';
import Header from '../Header';
import withMoviedb from '../../hoc/withMoviedb';

import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/movies/:id" component={DetailPage} />
          <Route path="/movies" component={MoviePage} />
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
};

export default withMoviedb()(App);
