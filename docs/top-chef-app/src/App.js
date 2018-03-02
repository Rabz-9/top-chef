import React, {
  Component
} from 'react';
import logo from './fork.png';
import tag from './tag.png';
import './App.css';
import RestaurantFork from './RestaurantForkWithPicture.json';
import MasonryInfiniteScroller from 'react-masonry-infinite';
class App extends Component {

   displayStars(nbStars){
    if(nbStars == 1)
    {
      return  <div><span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span></div>
    }
    else{
      if(nbStars == 2)
      {
        return  <div><span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span></div>
      }
      else{
        return  <div><span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span></div>
      }
    }
    }

  render() {
    return (
      <div className = "App" >
      <header className = "App-header">
        <h1 align="center">Find the Best Deal !</h1>
        <h3 align="center"> Web Application Architectures - Houaoui Rabah</h3>
      < /header >
      <h1 className = "App-intro" >
      Here you can find all the starred restaurants with a discount. <
      /h1>
        <div className = "Discount" >

       {
        RestaurantFork.map((restaurant) => {
          return <div className="card">
          <br/>
          <img src = {restaurant.picture} alt="logo" className = "logoRestaurant"/>
          <div className="container">
          <h3> {restaurant.name} </h3>
          <div>{this.displayStars(restaurant.stars) }</div>
          <p><img src = {tag} alt="discountRestaurant" className="discountRestaurant"/>  {restaurant.promotions}</p>
          </div>
          < /div>
        })
      }  </div>
      </div >
    );
  }
}

export default App;
