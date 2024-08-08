// src/pages/RoomDetail.js

import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Modal from '../components/Modal'; // Import the reusable Modal component
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
  const { state, dispatch } = useStateValue();
  const listing = state.selectedListing;

  const [currentMainImage, setCurrentMainImage] = useState(
    listing?.mainImageUrl || 'default-image-url'
  );
  const [modalType, setModalType] = useState(null); // State to track which modal to show
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  if (!listing) {
    return <div>No listing selected</div>;
  }

  const handleOrderClick = () => {
    if (!state.user) {
      setModalType('signIn');
      return;
    }

    console.log(`Ordering room: ${listing.title}`);
    alert('Order placed successfully!');
  };

  const isAvailable = listing.availability === 'Available';

  const handleSideImageClick = (url) => {
    setCurrentMainImage(url);
  };

  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case 'Free Wi-Fi':
        return <WifiIcon />;
      case 'Pool Access':
        return <PoolIcon />;
      case 'Gym Access':
        return <FitnessCenterIcon />;
      default:
        return null;
    }
  };

  const handleSignIn = () => {
    // Implement sign-in logic here
    setNotification('Signed in successfully!');
    setModalType(null);
  };

  const handleSignUp = () => {
    // Implement sign-up logic here
    setNotification('Signed up successfully!');
    setModalType(null);
  };

  return (
    <div className="room-detail">
      <div className="images-section">
        <img
          src={currentMainImage}
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
              onClick={() => handleSideImageClick(url)}
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
                {getServiceIcon(service.name)} {service.name}
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

      <Modal
        modalType={modalType}
        setModalType={setModalType}
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
