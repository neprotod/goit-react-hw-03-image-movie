import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';

import withMoviedb from '../../hoc/withMoviedb';

import style from './MovieReview.module.css';

class MovieReview extends Component {
  static propTypes = {
    moviedb: PropTypes.instanceOf(Object).isRequired,
    id: PropTypes.string.isRequired,
  };

  state = {
    loading: true,
    reviews: [],
  };

  async componentDidMount() {
    const { id, moviedb } = this.props;
    const reviews = await moviedb.getMovieReview(id);
    this.setState({
      loading: false,
      reviews,
    });
  }

  render() {
    const { loading, reviews } = this.state;
    const noReviews = <div className="no_reviews">Any reviews</div>;
    const items = reviews.map(({ id, author, content }) => (
      <div key={id} className={style.post}>
        <div className={style.author}>{author}</div>
        <div className={style.content}>{content}</div>
      </div>
    ));
    return (
      <Loading loaded={loading}>
        <div className={style.wrapper}>
          {(reviews.length && items) || noReviews}
        </div>
      </Loading>
    );
  }
}

export default withMoviedb()(MovieReview);
