import React from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

const domNode = document.querySelector('#modal-root');

class Modal extends React.Component {
  static propTypes = { close: propTypes.func, loader: propTypes.func };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };

  handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      this.props.close();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdrope}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      domNode,
    );
  }
}
export default Modal;
