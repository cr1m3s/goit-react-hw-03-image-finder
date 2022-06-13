import React from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

class ImageGallery extends React.Component {
  static defaultProps = { images: propTypes.array };

  static propTypes = {
    loader: propTypes.func,
    images: propTypes.array,
    modal: propTypes.func,
  };

  componentDidMount() {
    this.props.loader(true);
  }

  render() {
    return (
      <ul className="ImageGallery">
        {this.props.images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageLink={image.webformatURL}
              imagAlt={image.tags}
              largeImageURL={image.largeImageURL}
              modal={this.props.modal}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
