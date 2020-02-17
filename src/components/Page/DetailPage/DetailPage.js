import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loading from '../../Loading';
import { ButtonBack } from '../../Button';
import MovieDetails from '../../MovieDetails';
import withMoviedb from '../../../hoc/withMoviedb';

import style from './DetailPage.module.css';

const MovieCast = lazy(() => import('../../MovieCast'));
const MovieReview = lazy(() => import('../../MovieReview'));

class DetailPage extends Component {
  static propTypes = {
    moviedb: PropTypes.instanceOf(Object).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
      url: PropTypes.string,
    }).isRequired,
  };

  state = {
    loading: true,
    movie: {},
  };

  /**
   * For generate all novLinks and routing
   */
  links = [
    {
      label: 'Cast',
      suffixUrl: 'cast',
      RoutComponent: MovieCast,
    },
    {
      label: 'Reviews',
      suffixUrl: 'reviews',
      RoutComponent: MovieReview,
    },
  ];

  async componentDidMount() {
    const { moviedb, match } = this.props;
    const {
      params: { id },
    } = match;

    const movie = await moviedb.getMovieById(id);

    this.setState({
      loading: false,
      movie,
    });
  }

  render() {
    const { loading, movie } = this.state;
    const {
      match: { url, params },
      location,
    } = this.props;

    // Create all links
    const navLinks = this.links.map(({ label, suffixUrl }) => (
      <NavLink
        exact
        key={suffixUrl}
        to={{
          pathname: `${url}/${suffixUrl}`,
          state: location.state,
        }}
        className={style.additional_button}
        activeClassName={style.active}
      >
        {label}
      </NavLink>
    ));

    // Create all routing
    const routs = this.links.map(({ suffixUrl, RoutComponent }) => (
      <Route
        key={suffixUrl}
        path={`${url}/${suffixUrl}`}
        render={() => <RoutComponent id={params.id} />}
      />
    ));

    return (
      <Loading loaded={loading}>
        <ButtonBack />
        <MovieDetails movie={movie} />
        <div className="additional">
          <h3 className="h3">Additional information</h3>
          <div className={style.button_group}>{navLinks}</div>
        </div>
        <div className={style.additional_block}>
          <Suspense fallback={<Loading />}>{routs}</Suspense>
        </div>
      </Loading>
    );
  }
}

export default withMoviedb()(DetailPage);
