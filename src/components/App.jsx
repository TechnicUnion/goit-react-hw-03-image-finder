import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  formSubmitHandler = data => {
    console.log(data);
    this.setState({ searchQuery: data, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <div>
          <ImageGallery
            searchQuery={this.state.searchQuery}
            page={this.state.page}
          />
          {this.state.searchQuery && <Button onClick={this.loadMore} />}
        </div>
      </div>
    );
  }
}

export default App;
