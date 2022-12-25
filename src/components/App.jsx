import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

class App extends Component {
  state = {
    searchQuery: '',
  };

  formSubmitHandler = data => {
    console.log(data);
    this.setState({ searchQuery: data });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.state.searchQuery && (
          <div>
            <ImageGallery searchQuery={this.state.searchQuery} />
            <Button />
          </div>
        )}
      </div>
    );
  }
}

export default App;
