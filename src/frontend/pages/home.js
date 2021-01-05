// React
import React from 'react';
// Images
import Logo from '../assets/static/Logo-trymyride.png';
// Styles
import '../assets/styles/pages/Home.css';

//-----------------------------------------------//
//-----------------------------------------------//

// Home
const Home = () => {
  return (
    <div className="home">
      <img className="home__logo" src={Logo} />
      <div className="home__title">
        <h1 className="home__title--item1">Ciudades con mejor aire</h1>
        <h1 className="home__title--item2">para respirar</h1>
      </div>
    </div>
  );
};

export default Home;
