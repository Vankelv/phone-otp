import React, { useState } from "react";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

const Home = () => {

  const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoidmFua2VsdiIsImEiOiJjbGdtNzF4d2QwMzJlM2RvMmJ3eTF1NjFsIn0.1W_KyOgzJBWwfgZiQ6gdhw",
  });

  function Step1(props) {
    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");

    const handlePickupAddressChange = (e) => {
      setPickupAddress(e.target.value);
    };

    const handlePickupDateChange = (date) => {
      setPickupDate(date);
    };

    const handlePickupTimeChange = (time) => {
      setPickupTime(time);
    };

    const handleMapClick = (map, event) => {
      const [lng, lat] = event.lngLat;
      // TODO: Reverse geocode the coordinates to get the pickup address
      setPickupAddress(`[${lng}, ${lat}]`);
    };

    return (
      <div>
        <h1>Step 1: Enter Pickup Details</h1>
        <label>
          Pickup Address:
          <input
            type="text"
            value={pickupAddress}
            onChange={handlePickupAddressChange}
          />
        </label>
        {/* <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: "400px",
            width: "100%",
          }}
          center={[0, 0]}
          onClick={handleMapClick}
        >
          {pickupAddress && (
            <Marker coordinates={pickupAddress} anchor="bottom">
              <i className="fa fa-map-marker" />
            </Marker>
          )}
        </Map> */}
        <label>
          Pickup Date:
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => handlePickupDateChange(e.target.value)}
          />
        </label>
        <label>
          Pickup Time:
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => handlePickupTimeChange(e.target.value)}
          />
        </label>
        <button onClick={props.onNext}>Next</button>
      </div>
    );
  }

  return <Step1 onNext={() => console.log("Next button clicked")} />;
};

export default Home;
