import React from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.button_load} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
