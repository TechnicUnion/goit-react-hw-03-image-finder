import React, { Component } from 'react';
import css from '../styles.module.css';

export default class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropCkick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleBackdropCkick}>
        <div className={css.modal}>
          <img
            src="https://cdn.pixabay.com/photo/2022/12/18/19/30/christmas-7664112_1280.jpg"
            alt=""
          />
        </div>
      </div>
    );
  }
}
