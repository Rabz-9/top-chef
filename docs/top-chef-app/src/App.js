import React, { Component } from 'react';
import logo from './fork.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Starred Restaurants with a Discount</h1>
        </header>
        <p className="App-intro">
          Here you can find all the starred restaurants with a discount.
        </p>
      </div>
    );
  }
}

export default App;
