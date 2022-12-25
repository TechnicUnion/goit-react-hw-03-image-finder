import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    status: 'idle',
  };

  //   componentDidMount() {
  //     fetch(
  //       `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=30833222-94e556fd2dbde651348f500b2&image_type=photo&orientation=horizontal&per_page=12`
  //     )
  //       .then(res => res.json())
  //       .then(gallery => this.setState({ gallery }));
  //   }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=30833222-94e556fd2dbde651348f500b2&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(gallery => {
          if (gallery.hits.length > 0) {
            return this.setState({ gallery, status: 'resolved' });
          }

          return Promise.reject(
            new Error(
              `По запиту <${this.props.searchQuery}> зображення не знайдено`
            )
          );
        })
        .catch(error => {
          console.log(error);
          return this.setState({ error, status: 'rejected' });
        });
    }
  }

  render() {
    const galleryList = this.state.gallery;
    if (this.state.status === 'idle') {
      return <div>Введіть запит для пошуку</div>;
    }

    if (this.state.status === 'pending') {
      return <Loader />;
    }

    if (this.state.status === 'rejected') {
      console.log(this.state.error);
      return <h1>{this.state.error.message}</h1>;
    }

    if (this.state.status === 'resolved') {
      return (
        <ul className={css.gallery}>
          {galleryList &&
            galleryList.hits.map(item => (
              <li className={css.gallery_item} key={item.id}>
                <ImageGalleryItem item={item} />
              </li>
            ))}
        </ul>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
