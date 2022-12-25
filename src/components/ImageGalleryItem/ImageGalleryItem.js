import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item }) => {
  return (
    <div>
      <img src={item.webformatURL} alt={item.tags} />
    </div>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
