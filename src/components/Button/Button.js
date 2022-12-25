import React from 'react';
import css from '../styles.module.css';

const Button = () => {
  return (
    <button className={css.button_load} type="button">
      Load more
    </button>
  );
};

export default Button;
