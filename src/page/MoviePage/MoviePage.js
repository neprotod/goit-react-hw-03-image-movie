/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import qs from 'query-string';
import PropTypes from 'prop-types';

import FilmList from '../../components/FilmList';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import withMoviedb from '../../hoc/withMoviedb';

import style from './MoviePage.module.css';

class MoviePage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    moviedb: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    loading: true,
    movies: [],
  };

  componentDidMount() {
    const { location } = this.props;
    const parseQuery = qs.parse(location.search);
    if (!parseQuery.search) {
      this.setState({
        loading: false,
      });
      return;
    }
    this.searchHandler(parseQuery.search);
  }

  searchHandler = async search => {
    const { history, moviedb } = this.props;
    history.push({
      ...this.props.location,
      search: `search=${search}`,
    });
    const movies = await moviedb.getMoviesByQuery(search);
    this.setState({
      loading: false,
      movies,
    });
  };

  render() {
    const { loading, movies } = this.state;
    const { searchHandler } = this;
    return (
      <>
        <SearchBar searchHandler={searchHandler} />
        <Loading loaded={loading}>
          <div className={style.wrapper}>
            <FilmList items={movies} />
          </div>
        </Loading>
      </>
    );
  }
}

export default withMoviedb()(MoviePage);
