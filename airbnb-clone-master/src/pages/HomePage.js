// src/pages/HomePage.js

import React from 'react';
import { useStateValue } from '../context/StateProvider';
import './HomePage.css';

// Updated sample data with more detailed information
const featureListings = [
  {
    id: 1,
    title: "Beautiful Beachfront Apartment",
    location: "Miami, FL",
    price: 200,
    mainImageUrl: "/images/bedroom-4.jpg",
    imageUrls: [
      "/images/bedroom-5.jpg",
      "/images/bedroom-6.jpg",
      "/images/bedroom-7.jpg",
      "/images/window-1.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Free Wi-Fi", icon: "fas fa-wifi" },
      { name: "Pool Access", icon: "fas fa-swimmer" },
    ],
    benefits: "Relax and enjoy a beautiful beachfront view.",
  },
  {
    id: 2,
    title: "Modern City Loft",
    location: "New York, NY",
    price: 300,
    mainImageUrl: "/images/ai-generated.png",
    imageUrls: [
      "/images/bedroom-8.jpg",
      "/images/bedroom-9.jpg",
      "/images/bedroom-4.jpg",
      "/images/window-1.jpg",
    ],
    hostName: "Alex Johnson",
    hostContact: "alex.johnson@example.com",
    services: [
      { name: "Free Wi-Fi", icon: "fas fa-wifi" },
      { name: "Gym Access", icon: "fas fa-dumbbell" },
    ],
    benefits: "Stay in the heart of the city with modern amenities.",
  },
  // Add more listings as needed
];

const HomePage = () => {
  const { dispatch } = useStateValue();

  const handleCardClick = (listing) => {
    console.log(`Clicked on ${listing.title}`); // Debug: Check if the click is registered
    dispatch({
      type: 'SET_SELECTED_LISTING',
      payload: listing,
    });
    dispatch({
      type: 'SET_PAGE',
      payload: 'roomDetail',
    });
  };

  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to Our Airbnb Clone</h1>
        <p>Discover unique places to stay and experiences around the world.</p>
      </header>
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Explore</h3>
            <p>Find unique homes and experiences globally.</p>
          </div>
          <div className="feature-item">
            <h3>Host</h3>
            <p>Earn money by sharing your space.</p>
          </div>
          <div className="feature-item">
            <h3>Travel</h3>
            <p>Book unforgettable trips with ease.</p>
          </div>
        </div>
      </section>
      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="listings-grid">
          {featureListings.map((listing) => (
            <div
              key={listing.id}
              className="listing-card"
              onClick={() => handleCardClick(listing)}
            >
              <img
                src={listing.mainImageUrl}
                alt={listing.title}
                className="listing-image"
              />
              <div className="listing-details">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <p>${listing.price} per night</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
