import React, { Component } from 'react';
import qs from 'query-string';
import PropTypes from 'prop-types';

import FilmList from '../../FilmList';
import Loading from '../../Loading';
import SearchBar from '../../SearchBar';
import withMoviedb from '../../../hoc/withMoviedb';

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

  async componentDidMount() {
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

  /**
   * Add path to history and find resource.
   *
   * @param {String} search query strung
   * @return void
   */
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
