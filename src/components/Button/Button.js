import React from 'react';
import propTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = { function: propTypes.func };

  render() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    return (
      <button className="Button" type="button" onClick={e => this.props.function()}>
        Load more
      </button>
    );
  }
}

export default Button;
