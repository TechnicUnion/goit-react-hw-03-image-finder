import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <div>
      <img src={item.webformatURL} alt={item.tags} onClick={onClick} />
    </div>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
