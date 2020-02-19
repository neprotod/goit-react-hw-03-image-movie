/* eslint-disable import/no-cycle */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import routers from '../../routers';

import style from './FilmList.module.css';

// console.log(routing);
// const { detail } = routing;

const FilmList = ({ items, location }) => {
  if (!items.length) {
    return <div className={style.no_result}>Movies do not found</div>;
  }
  return (
    <ul className={style.ul}>
      {items.map(({ id, title }) => (
        <li key={id} className={style.li}>
          <Link
            to={{
              pathname: routers.DETAIL_PAGE.pathname.replace(':id', id),
              state: { from: location },
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

FilmList.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(FilmList);
