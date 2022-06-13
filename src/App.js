import './App.css';
import React from 'react';
import axios from 'axios';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

const APIkey = '25175816-a3b0e6224fe7d6836881efcec';

class App extends React.Component {
  state = {
    searchWords: '',
    images: [],
    showModal: false,
    modalImage: '',
    showLoader: false,
    currentPage: 1,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };

  setModalImage = linkImg => {
    return this.setState(({ modalImage }) => ({ modalImage: linkImg }));
  };

  openLargeImage = linkImg => {
    this.setModalImage(linkImg);
    this.toggleModal();
  };

  loaderToggle = bool => {
    return this.setState(({ showLoader }) => ({ showLoader: bool }));
  };

  getImages(words, page) {
    this.loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        this.pushImagesToState(response);
        this.loaderToggle(false);
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
        }));
      });
  }

  searchFormSubmit = event => {
    event.preventDefault();
    this.setState({
      searchWords: '',
      images: [],
      showModal: false,
      modalImage: '',
      currentPage: 1,
    });
    const searchWordsValue = event.target[1].value;

    this.setState({ searchWords: searchWordsValue });
    const page = 1;
    this.getImages(searchWordsValue, page);
    event.target.reset();
  };

  loadMore = () => {
    this.loaderToggle(true);
    this.getImages(this.state.searchWords, this.state.currentPage);
  };

  render() {
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal close={this.toggleModal} loader={this.loaderToggle}>
            <img src={this.state.modalImage} alt="modal" />
          </Modal>
        )}
        <Searchbar onSubmit={this.searchFormSubmit} />

        {this.state.searchWords !== '' && (
          <ImageGallery
            loader={this.loaderToggle}
            images={this.state.images}
            modal={this.openLargeImage}
          ></ImageGallery>
        )}
        {this.state.showLoader && <Loader />}
        {this.state.searchWords !== '' && <Button function={this.loadMore} />}
      </div>
    );
  }
}

export default App;
