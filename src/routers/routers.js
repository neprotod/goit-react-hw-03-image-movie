import DetailPage from '../page/DetailPage/DetailPage';
import MoviePage from '../page/MoviePage/MoviePage';
import HomePage from '../page/HomePage/HomePage';
import NotFound from '../page/NotFound/NotFound';

export default {
  HOME_PAGE: {
    pathname: '/',
    component: HomePage,
  },
  NOT_FOUND_PAGE: {
    pathname: '',
    component: NotFound,
  },
  DETAIL_PAGE: {
    pathname: '/movies/:id',
    component: DetailPage,
  },
  MOVIE_PAGE: {
    pathname: '/movies',
    component: MoviePage,
  },
};
