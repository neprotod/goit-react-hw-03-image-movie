/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import withMoviedb from '../../hoc/withMoviedb';

import style from './MovieCast.module.css';

export class MovieCast extends Component {
  static propTypes = {
    moviedb: PropTypes.instanceOf(Object).isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  };

  state = {
    loading: true,
    cast: [],
  };

  async componentDidMount() {
    const { id, moviedb } = this.props;
    const cast = await moviedb.getMovieCredits(id);
    this.setState({
      loading: false,
      cast,
    });
  }

  render() {
    const { loading, cast } = this.state;
    const { moviedb } = this.props;
    const noArtist = <div className="no_artist">No artists</div>;
    const noImage = <div className={style.no_image}>No image</div>;
    const items = cast.map(({ cast_id, name, profile_path }) => (
      <div key={cast_id} className={style.cart}>
        <div className={style['img-box']}>
          {(profile_path && (
            <img src={moviedb.getImgUrl(profile_path)} alt={name} />
          )) ||
            noImage}
        </div>
        <div className="name">{name}</div>
      </div>
    ));

    return (
      <Loading loaded={loading}>
        <div className={style.wrapper}>
          {(cast.length && items) || noArtist}
        </div>
      </Loading>
    );
  }
}

export default withMoviedb()(MovieCast);
