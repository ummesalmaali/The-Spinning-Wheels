import React, { useEffect, useState } from 'react'
import fakeData from '../components/FakeData/fakaData.json'
import RideDetails from './RideDetails';
function Ride() {
    const [rides,setRides] = useState(fakeData);

    useEffect(()=>{
      setRides(fakeData);
    },[])
    const handleRide = (ride)=>{
    //  const newRide = [...rides,rideAgain]
    //  setRides(newRide);
    }
    return (
        <div className='row'>
            {
                rides.map(ride => <RideDetails ride={ride} key={ride.id} handleRide={handleRide}></RideDetails>)
            }
           
        </div>
    )
}

export default Ride
