/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import config from '../config';

export default class Moviedb {
  baseUrl = 'https://api.themoviedb.org/3/';

  imgUrl = 'https://image.tmdb.org/t/p/w300/';

  /**
   * Add to base url
   */
  urlType = {
    TRENDING_WEEK: 'trending/movie/week',
    SEARCH: 'search/movie',
    GET_ONE_MOVIE: 'movie/',
  };

  /**
   * Default query
   */
  apiQuery = {
    // Privet key
    api_key: config.key,
  };

  /**
   * This function connection all query to one string
   *
   * @param {{}} newQuery it's new query string, key => value
   * @return {String} query string
   */
  _setQuery = (newQuery = {}) => {
    const { apiQuery } = this;

    const queryObj = { ...apiQuery, ...newQuery };
    // Create query string
    return Object.entries(queryObj).reduce((acc, [key, value]) => {
      const sing = (acc && '&') || '?';

      return `${acc}${sing}${key}=${value}`;
    }, '');
  };

  /**
   * Get resource from url
   *
   * @param {String} url resource url
   * @return {{}} resource
   */
  _getResource = async url => {
    try {
      return await axios.get(url);
    } catch (e) {
      console.error(e);
      throw new Error('Could get resource');
    }
  };

  /**
   * Concat to base url
   *
   * @param  {...any} arg string to concat 'hello', 'world'
   * @return {String} concatenated string
   */
  _concat = (...arg) => {
    const { baseUrl } = this;
    return baseUrl.concat(...arg);
  };

  /**
   * Return all the trending movies in a week.
   *
   * @return {Array} resource with movies
   */
  getTrendsWeek = async () => {
    const { _concat, urlType, _setQuery, _getResource } = this;
    const url = _concat(urlType.TRENDING_WEEK, _setQuery());
    const res = await _getResource(url);

    return res.data.results;
  };

  /**
   * Return movie by id.
   *
   * @param {Number} id movie id
   * @return {Array} resource with movie
   */
  getMovieById = async id => {
    const { _concat, urlType, _setQuery, _getResource } = this;
    const url = _concat(urlType.GET_ONE_MOVIE, id, _setQuery());
    const res = await _getResource(url);

    return res.data;
  };

  /**
   * Return credits.
   *
   * @param {Number} id movie id
   * @return {Array} resource with cast
   */
  getMovieCredits = async id => {
    const { _concat, urlType, _setQuery, _getResource } = this;
    const url = _concat(urlType.GET_ONE_MOVIE, id, '/credits', _setQuery());
    const res = await _getResource(url);

    return res.data.cast;
  };

  /**
   * Return reviews.
   *
   * @param {Number} id movie id
   * @return {Array} resource with reviews
   */
  getMovieReview = async id => {
    const { _concat, urlType, _setQuery, _getResource } = this;
    const url = _concat(urlType.GET_ONE_MOVIE, id, '/reviews', _setQuery());
    const res = await _getResource(url);

    return res.data.results;
  };

  /**
   * Return reviews.
   *
   * @param {string} id movie name
   * @return {Array} resource with movies
   */
  getMoviesByQuery = async query => {
    const { _concat, urlType, _setQuery, _getResource } = this;
    const url = _concat(urlType.SEARCH, _setQuery({ query }));
    const res = await _getResource(url);

    return res.data.results;
  };

  /**
   * Get url to image
   *
   * @param {String} url
   * @return {String} url to img
   */
  getImgUrl = url => {
    return `${this.imgUrl}${url}`;
  };
}
