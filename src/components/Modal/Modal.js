import React, { Component } from 'react';
import css from '../styles.module.css';

export default class Modal extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
