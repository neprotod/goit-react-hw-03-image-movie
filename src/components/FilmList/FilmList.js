import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './FilmList.module.css';

const FilmList = ({ items, location }) => {
  if (!items.length) {
    return <div className={style.no_result}>Movies do not found</div>;
  }

  return (
    <ul className={style.ul}>
      {items.map(({ id, title }) => {
        const link = `/movies/${id}`;
        return (
          <li key={id} className={style.li}>
            <Link
              to={{
                pathname: link,
                state: { from: location },
              }}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

FilmList.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(FilmList);
