import React from 'react';
import propTypes from 'prop-types';

class ImageGalleryItem extends React.Component {
  static defaultProps = { imageLink: ' ', imageAlt: ' ' };

  static propTypes = {
    imageLink: propTypes.string,
    imageAlt: propTypes.string,
    largeImageURL: propTypes.string,
    modal: propTypes.func,
  };

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={e => {
            this.props.modal(e.target.attributes[2].value);
          }}
          src={this.props.imageLink}
          alt={this.props.imageAlt}
          data-large={this.props.largeImageURL}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
