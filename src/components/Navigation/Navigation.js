import React from 'react';
import 'tachyons';
import './Navigation.css';
import logo from './logo.png';

const Navigation = () => {
	return(
		<div className=''>
      <nav style={{display:'flex'}}>
      <img className= 'ml5 mt4 mb4' alt = 'Hello' src= { logo }/>
        <p className = 'ml4 mt4 mb4 spacing logo f1 pointer'>Calendar</p>

		</nav>
		</div>
		);
}

export default Navigation;