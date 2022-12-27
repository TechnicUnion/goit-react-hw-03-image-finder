import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: 'idle',
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.props.page}&key=30833222-94e556fd2dbde651348f500b2&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(gallery => {
          if (gallery.hits.length > 0 && !this.props.newFetch) {
            return this.setState({
              gallery: [...prevState.gallery, gallery],
              status: 'resolved',
            });
          } else if (this.props.newFetch && gallery.hits.length > 0) {
            return this.setState({
              gallery: [gallery],
              status: 'resolved',
            });
          }

          return Promise.reject(
            new Error(
              `По запиту <${this.props.searchQuery}> зображення не знайдено`
            )
          );
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  openModal = data => {
    this.setState({
      showModal: true,
      largeImage: data,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { gallery, status, error } = this.state;
    if (status === 'idle') {
      return <div>Введіть запит для пошуку</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          {this.state.showModal && (
            <Modal image={this.state.largeImage} onClose={this.closeModal} />
          )}
          <ul className={css.gallery}>
            {gallery.map(({ hits }) =>
              hits.map(item => (
                <li className={css.gallery_item} key={item.id}>
                  <ImageGalleryItem item={item} onClick={this.openModal} />
                </li>
              ))
            )}
          </ul>
          {this.state.gallery.length !==
            Math.ceil(this.state.gallery[0].totalHits / 12) && (
            <Button onClick={this.props.onClick} />
          )}
        </div>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
