import React from "react";
import Map from "./Map";

function RideDetails(props) {
  return (
    <div className="row">
      <div className='col-md-3'>
        <p>Pick From</p>
        <input type="text" placeholder="Pick From" />
        <p>Pick To</p>
        <input type="text" placeholder="Pick To" />
      </div>
      <div className='col-md-9'>
         <Map/>
      </div>
    </div>
  );
}

export default RideDetails;
