import React from 'react';
import { Link } from 'react-router-dom';

const FilmList = ({ items }) => {
  return (
    <ul>
      {items.map(({ id, title }) => {
        const link = `/movies/${id}`;
        return (
          <li key={id}>
            <Link to={link}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FilmList;
