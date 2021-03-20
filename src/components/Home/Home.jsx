import React from 'react'
import NavBar from '../Navbar/NavBar'
import bikeImage from '../../images/vehicles/bike.png';
import busImage from '../../images/vehicles/bus.png';
import carImage from '../../images/vehicles/car.png';
import trainImage from '../../images/vehicles/train.png';
import './Home.css'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Home() {
    const history = useHistory()
    const handleRide = ()=>{
        // history.push(`/ride/${rideType}`);
    }
    return (
        <>
        <NavBar></NavBar>
        <div className='ridersVehicles'>
            <div className="vehicles bike">
               <Link to='/destination'><img onClick={handleRide} src={bikeImage} alt="Bike"/>
                <h3>BIKE</h3></Link>
            </div>
            <div className="vehicles car">
            <Link to='/destination'><img onClick={handleRide} src={carImage} alt="Car"/>
                <h3>CAR</h3></Link>
            </div>
            <div className="vehicles bus ">
            <Link to='/destination'><img onClick={handleRide} src={busImage} alt="Bus"/>
                <h3>BUS</h3></Link>
            </div>
            <div className="vehicles train">
            <Link to='/destination'><img onClick={()=>handleRide} src={trainImage} alt="Train"/>
                <h3>TRAIN</h3></Link>
            </div>
        </div>
        </>
    )
}

export default Home
