/* eslint-disable no-alert */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage, Error404, DetailPage } from '../Page';
import Header from '../Header';
import withMoviedb from '../../hoc/withMoviedb';

import './App.css';

class App extends Component {
  state = {};

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <Router>
        <Header />
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movies/:id" component={DetailPage} />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withMoviedb()(App);
