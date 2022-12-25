import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    gallery: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=30833222-94e556fd2dbde651348f500b2&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(gallery => this.setState({ gallery }));
    }
  }

  render() {
    const galleryList = this.state.gallery;
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

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
