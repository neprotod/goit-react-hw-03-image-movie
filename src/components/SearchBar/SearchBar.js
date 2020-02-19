import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './SearchBar.module.css';

class SearchBar extends Component {
  static propTypes = {
    searchHandler: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { searchHandler } = this.props;
    const { state } = this;
    if (!state.value) return;

    searchHandler(state.value);

    this.setState({
      value: '',
    });
  };

  render() {
    const { onChange, onSubmit, state } = this;

    return (
      <form className={style.search} onSubmit={onSubmit}>
        <input
          type="text"
          value={state.value}
          onChange={onChange}
          className={style.input}
        />
        <button type="submit" className={style.button}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
