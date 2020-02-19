/* eslint-disable no-alert */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routers from '../../routers';

import Header from '../Header';
import withMoviedb from '../../hoc/withMoviedb';

import './App.css';

const { HOME_PAGE, DETAIL_PAGE, NOT_FOUND_PAGE, MOVIE_PAGE } = routers;

const App = () => {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route
            exact
            path={HOME_PAGE.pathname}
            component={HOME_PAGE.component}
          />
          <Route
            path={DETAIL_PAGE.pathname}
            component={DETAIL_PAGE.component}
          />
          <Route path={MOVIE_PAGE.pathname} component={MOVIE_PAGE.component} />
          <Route component={NOT_FOUND_PAGE.component} />
        </Switch>
      </div>
    </Router>
  );
};

export default withMoviedb()(App);
