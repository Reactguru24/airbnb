// src/pages/ListingsPage.js

import React, { useState } from "react";
import { useStateValue } from "../context/StateProvider";
import "./ListingsPage.css";

// Sample data for demonstration
const sampleListings = [
  {
    id: 1,
    title: "Cozy Cottage",
    location: "Nashville, TN",
    price: 120,
    availability: "Available",
    mainImageUrl: "/images/bedroom-7.jpg",
    imageUrls: [
      "/images/bedroom-6.jpg",
      "/images/bedroom-5.jpg",
      "/images/bedroom-9.jpg",
      "/images/window-1.jpg",
    ],
    hostName: "John Doe",
    hostContact: "john.doe@example.com",
    services: [
      { name: "Free Wi-Fi", icon: "fas fa-wifi" },
      { name: "Breakfast Included", icon: "fas fa-coffee" },
    ],
    benefits: "Relax in a beautiful setting with stunning views.",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 300,
    availability: "Available",
    mainImageUrl: "/images/ai-generated.png",
    imageUrls: [
      "/images/bedroom-8.jpg",
      "/images/bedroom-6.jpg",
      "/images/bedroom-5.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "24/7 Concierge", icon: "fas fa-concierge-bell" },
    ],
    benefits: "Enjoy luxury living in the heart of the city.",
  },
  {
    id: 3,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 450,
    availability: "Available",
    mainImageUrl: "/images/bedroom-5.jpg",
    imageUrls: [
      "/images/bedroom-9.jpg",
      "/images/indoor-2.jpg",
      "/images/bedroom-photo-1.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "24/7 Concierge", icon: "fas fa-concierge-bell" },
    ],
    benefits: "Enjoy luxury living in the heart of the city.",
  },
  {
    id: 4,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 320,
    availability: "Available",
    mainImageUrl: "/images/indoor-2.jpg",
    imageUrls: [
      "/images/bedroom-9.jpg",
      "/images/indoor-2.jpg",
      "/images/bedroom-photo-1.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "24/7 Concierge", icon: "fas fa-concierge-bell" },
    ],
    benefits: "Enjoy luxury living in the heart of the city.",
  },
  {
    id: 5,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 150,
    availability: "Available",
    mainImageUrl: "/images/window-1.jpg",
    imageUrls: [
      "/images/bedroom-9.jpg",
      "/images/indoor-2.jpg",
      "/images/bedroom-photo-1.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "24/7 Concierge", icon: "fas fa-concierge-bell" },
    ],
    benefits: "Enjoy luxury living in the heart of the city.",
  },
  {
    id: 6,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 180,
    availability: "Available",
    mainImageUrl: "/images/bedroom-6.jpg",
    imageUrls: [
      "/images/bedroom-9.jpg",
      "/images/window-1.jpg",
      "/images/bedroom-photo-1.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "24/7 Concierge", icon: "fas fa-concierge-bell" },
    ],
    benefits: "Enjoy luxury living in the heart of the city.",
  },
  {
    id: 6,
    title: "Modern Apartment",
    location: "New York, NY",
    price: 180,
    availability: "Available",
    mainImageUrl: "/images/bedroom-6.jpg",
    imageUrls: [
      "/images/bedroom-9.jpg",
      "/images/window-1.jpg",
      "/images/bedroom-photo-1.jpg",
    ],
    hostName: "Jane Smith",
    hostContact: "jane.smith@example.com",
    services: [
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "24/7 Concierge", icon: "fas fa-concierge-bell" },
    ],
    benefits: "Enjoy luxury living in the heart of the city.",
  },
  // Add more listings as needed...
];

const ListingsPage = () => {
  const { dispatch } = useStateValue();
  const [locationFilter, setLocationFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(10); // Minimum price of $10
  const [maxPriceFilter, setMaxPriceFilter] = useState(500); // Default maximum price

  const handleListingClick = (listing) => {
    dispatch({
      type: "SET_SELECTED_LISTING",
      payload: listing,
    });
    dispatch({
      type: "SET_PAGE",
      payload: "roomDetail",
    });
  };

  // Filter listings based on the location and price range
  const filteredListings = sampleListings.filter((listing) => {
    const matchesLocation = listing.location
      .toLowerCase()
      .includes(locationFilter.toLowerCase());
    const matchesPrice =
      listing.price >= minPriceFilter && listing.price <= maxPriceFilter;
    return matchesLocation && matchesPrice;
  });

  return (
    <div className="listings-page">
      <h1>Listings</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum price"
          value={minPriceFilter}
          onChange={(e) =>
            setMinPriceFilter(Math.max(0, parseInt(e.target.value, 10) || 0))
          }
          min="10" // Minimum price input limit
          className={minPriceFilter < 10 ? "invalid" : ""}
        />
        <input
          type="number"
          placeholder="Maximum price"
          value={maxPriceFilter}
          onChange={(e) =>
            setMaxPriceFilter(Math.max(minPriceFilter, parseInt(e.target.value, '' ) || 0))
          }
        />
      </div>
      <div className="listings-grid">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="listing-card"
            onClick={() => handleListingClick(listing)}
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
    </div>
  );
};

export default ListingsPage;
