import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    gallery: null,
    loading: false,
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
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=30833222-94e556fd2dbde651348f500b2&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(gallery => this.setState({ gallery }))
        .finally(this.setState({ loading: false }));
    }
  }

  render() {
    const galleryList = this.state.gallery;
    return (
      <div>
        {this.state.loading && <Loader />}
        <ul className={css.gallery}>
          {galleryList &&
            galleryList.hits.map(item => (
              <li className={css.gallery_item} key={item.id}>
                <ImageGalleryItem item={item} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
