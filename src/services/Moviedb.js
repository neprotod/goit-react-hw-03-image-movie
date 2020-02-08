/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import config from '../config';

export default class Moviedb {
  baseUrl = 'https://api.themoviedb.org/3/';

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
   * @param {{}} newQuery it's new query string
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
   * Return all the trending movies in a week.
   */
  getTrendsWeek = async () => {
    const { baseUrl, urlType, _setQuery } = this;
    const url = baseUrl + urlType.TRENDING_WEEK + _setQuery();
    try {
      const res = await axios.get(url);
      return res.data.results;
    } catch (e) {
      throw new Error('Could get resource');
    }
  };
}
