import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilmList from '../../FilmList';
import Loading from '../../Loading';
import withMoviedb from '../../../hoc/withMoviedb';

class HomePage extends Component {
  static propTypes = {
    moviedb: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    trends: [],
    loading: true,
  };

  async componentDidMount() {
    const { moviedb } = this.props;
    const trends = await moviedb.getTrendsWeek();
    this.setState({
      trends,
      loading: false,
    });
  }

  render() {
    const { trends, loading } = this.state;

    return (
      <Loading loaded={loading}>
        <h1>Trends a week</h1>
        <FilmList items={trends} />
      </Loading>
    );
  }
}

export default withMoviedb()(HomePage);
