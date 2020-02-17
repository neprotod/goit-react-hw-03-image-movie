import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './ButtonBack.module.css';

const ButtonBack = ({ history, location }) => {
  // Handler to button
  const goBack = () => {
    if (location.state.from) {
      history.push(location.state.from);
    } else {
      throw new Error("Link doesn't have location.state.from");
    }
  };

  // Testing need to put this button
  if (!location.state) {
    return null;
  }

  return (
    <button className={style.button} type="button" onClick={goBack}>
      Go back
    </button>
  );
};

ButtonBack.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(ButtonBack);
