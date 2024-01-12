import React from 'react';
import { useState } from 'react';
import Header from '../Header';
import Guests from '../Guests';
import CashboxModal from '../CashboxModal';
import './Home.scss';

const Home = () => {
  return (
    <div className="App">
      {/* <Header /> */}

      <Guests />
      
      {/* <Cashbox /> */}
    </div>
  );
}

export default Home;


