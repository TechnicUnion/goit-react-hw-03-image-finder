import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { animateScroll as scroll } from 'react-scroll';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    newFetch: false,
  };

  formSubmitHandler = data => {
    if (this.state.searchQuery !== data) {
      this.setState({ searchQuery: data, page: 1, newFetch: true });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, newFetch: false }));
    scroll.scrollToBottom();
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <div>
          <ImageGallery
            searchQuery={this.state.searchQuery}
            page={this.state.page}
            newFetch={this.state.newFetch}
            onClick={this.loadMore}
          />
        </div>
      </div>
    );
  }
}

export default App;
