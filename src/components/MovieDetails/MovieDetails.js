/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import withMoviedb from '../../hoc/withMoviedb';

import style from './MovieDetails.module.css';

const MovieDetails = ({ movie, moviedb }) => {
  const { poster_path, original_title, overview, vote_average, genres } = movie;
  return (
    <>
      <div className={style.row}>
        <div className={style['left-coll']}>
          <img
            src={moviedb.getImgUrl(poster_path)}
            className="img"
            alt={original_title}
          />
        </div>
        <div className={style['right-coll']}>
          <h1 className={style.title}>{original_title}</h1>
          <div className={style.user_scope}>
            User scope: {vote_average * 10}%
          </div>
          <h2 className={style.sub_title}>Overview</h2>
          <div className={style.description}>{overview}</div>
          <h2 className={style.sub_title}>Genres</h2>
          <div className={style.genres}>
            {genres.map(({ id, name }) => (
              <span className={style.genre} key={id}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  moviedb: PropTypes.instanceOf(Object).isRequired,
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,

    genres: PropTypes.oneOfType([PropTypes.array]),
  }).isRequired,
};

export default withMoviedb()(MovieDetails);
