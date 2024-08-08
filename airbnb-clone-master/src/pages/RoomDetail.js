// src/pages/RoomDetail.js

import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './RoomDetail.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const mapCenter = {
  lat: 36.1627, // Default latitude (Nashville, TN for demonstration)
  lng: -86.7816, // Default longitude
};

const RoomDetail = () => {
  const { state } = useStateValue();
  const listing = state.selectedListing;

  // State to track the currently displayed main image
  const [currentMainImage, setCurrentMainImage] = useState(
    listing?.mainImageUrl || 'default-image-url'
  );

  if (!listing) {
    return <div>No listing selected</div>;
  }

  const handleOrderClick = () => {
    // Implement order logic here, e.g., navigate to an order form or booking process
    console.log(`Ordering room: ${listing.title}`);
    alert('Order placed successfully!');
  };

  const isAvailable = listing.availability === 'Available'; // Determine if the listing is available

  // Function to handle clicking on side images
  const handleSideImageClick = (url) => {
    setCurrentMainImage(url); // Update the main image to the clicked side image
  };

  return (
    <div className="room-detail">
      <div className="images-section">
        <img
          src={currentMainImage} // Use the current main image
          alt={listing.title || 'Listing'}
          className="main-image"
        />
        <div className="side-images">
          {(listing.imageUrls || []).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Listing ${index}`}
              className="side-image"
              onClick={() => handleSideImageClick(url)} // Set the main image on click
            />
          ))}
        </div>
      </div>
      <div className="info-section">
        <h1>{listing.title}</h1>
        <p>{listing.location}</p>
        <p>${listing.price} per night</p>
        <p className={isAvailable ? 'available' : 'unavailable'}>
          {isAvailable ? 'Available' : 'Not Available'}
        </p>
        <div className="host-info">
          <h3>Host Information</h3>
          <p>{listing.hostName}</p>
          <p>Contact: {listing.hostContact}</p>
        </div>
        <div className="services">
          <h3>Services</h3>
          <ul>
            {(listing.services || []).map((service, index) => (
              <li key={index}>
                <i className={service.icon}></i> {service.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="benefits">
          <h3>Benefits</h3>
          <p>{listing.benefits}</p>
        </div>
        <button
          className="order-button"
          onClick={handleOrderClick}
          disabled={!isAvailable}
        >
          Order Now
        </button>
        <div className="map-section">
          <h3>Location</h3>
          <LoadScript googleMapsApiKey="AIzaSyALbmdzcmbkg-ZkdV2hCnhH9gHYRRdmkbw">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={14}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
