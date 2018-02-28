import React, {
  Component
} from 'react';
import logo from './fork.png';
import './App.css';
import RestaurantFork from './RestaurantFork.json';
import MasonryInfiniteScroller from 'react-masonry-infinite';
class App extends Component {
  render() {
    return (
      <div className = "App" >
      <header className = "App-header" >
      <img src = {  logo } className = "App-logo" alt = "logo" / >
      <h1 className = "App-title" > Starred Restaurants with a Discount < /h1>
      < /header >
      <h1 className = "App-intro" >
      Here you can find all the starred restaurants with a discount. <
      /h1>
      <
      div className = "Discount" >
       {
        RestaurantFork.map(function(restaurant) {
          return <li > {
            restaurant.name
          } - Number of stars : {
            restaurant.stars
          } - {
            restaurant.promotions
          } < /li>
        })
      }  <
      /div> <
      /div >
    );
  }
}

export default App;
