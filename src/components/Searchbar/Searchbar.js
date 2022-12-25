import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleInputChange = eve => {
    this.setState({ searchQuery: eve.currentTarget.value.toLowerCase() });
  };

  handleSubmit = eve => {
    eve.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    // this.inputReset();
  };
  //   inputReset() {
  //     this.setState({ name: '', number: '' });
  //   }

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
