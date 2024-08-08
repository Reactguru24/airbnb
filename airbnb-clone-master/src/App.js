// src/App.js

import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import AboutPage from './pages/AboutPage';
import RoomDetail from './pages/RoomDetail';
import ResetPasswordPage from './pages/ResetPasswordPage'; // Import reset password page
import { StateProvider, useStateValue } from './context/StateProvider';

const AppContent = () => {
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    // Initialize state from localStorage
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      dispatch({ type: 'SET_PAGE', payload: savedPage });
    }
  }, [dispatch]);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('currentPage', state.currentPage);
  }, [state.currentPage]);

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <HomePage />;
      case 'listings':
        return <ListingsPage />;
      case 'about':
        return <AboutPage />;
      case 'roomDetail':
        return <RoomDetail />;
      case 'resetPassword':
        return <ResetPasswordPage />;
      default:
        return <HomePage />; // Default to HomePage
    }
  };

  return (
    <div className="app">
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

const App = () => (
  <StateProvider>
    <AppContent />
  </StateProvider>
);

export default App;
