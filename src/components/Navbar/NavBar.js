import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import bg from '../../images/bgImg/Bg.png'
const NavBar = () => {
    return (
            <div style={{backgroundImage:`url(${bg})`}}> 
                <div className='navBar'>
            <div className="brand">
                <h3 style={{color:'orange'}}> The Spinning Wheels</h3>
            </div>
            <div  >
            <ul className="nav">
                <li className='navItem'>
                    <Link to ='/home'>Home</Link> </li>
                <li className='navItem'>
                    <Link to ='/destination'>Destination</Link></li>
                <li className='navItem'>
                    <Link to='/blog'>Blog</Link></li>
                <li className='navItem'>
                    <Link to="/contact">Contact</Link></li>
                <li className='navItem'>
                   <Link to='/signInForm'> <button style={{borderRadius:'5px'}} className="btn-primary">Log In</button> </Link></li>
            </ul>
            </div>
        </div>
            </div>

    );
};

export default NavBar;
