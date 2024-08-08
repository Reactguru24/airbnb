// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import './Navbar.css';
import { auth } from '../firebase'; // Import auth from Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'; // Import authentication functions

const Navbar = () => {
  const { state, dispatch } = useStateValue();
  const [modalType, setModalType] = useState(null); // State to track which modal to show
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const changePage = (page) => {
    dispatch({
      type: 'SET_PAGE',
      payload: page,
    });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setNotification('Signed in successfully!');
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setModalType(null); // Close modal
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setNotification('Error signing in: ' + error.message);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setNotification('Signed up successfully!');
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setModalType(null); // Close modal
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setNotification('Error signing up: ' + error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setNotification('Signed out successfully!');
        dispatch({ type: 'SET_USER', payload: null });
      })
      .catch((error) => {
        setNotification('Error signing out: ' + error.message);
      });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <button 
            onClick={() => changePage('home')}
            className={state.currentPage === 'home' ? 'active' : ''}
          >
            Home
          </button>
          <button 
            onClick={() => changePage('listings')}
            className={state.currentPage === 'listings' ? 'active' : ''}
          >
            Browse
          </button>
          <button 
            onClick={() => changePage('about')}
            className={state.currentPage === 'about' ? 'active' : ''}
          >
            About
          </button>
        </div>
        <div className="nav-right">
          {state.user ? (
            <>
              <span className="user-email">{state.user.email}</span>
              <button onClick={handleSignOut} className="auth-button">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setModalType('signIn')} className="auth-button">
                Sign In
              </button>
              <button onClick={() => setModalType('signUp')} className="auth-button">
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Modal for Sign In/Sign Up */}
      {(modalType === 'signIn' || modalType === 'signUp') && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalType === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={modalType === 'signIn' ? handleSignIn : handleSignUp}>
              {modalType === 'signIn' ? 'Sign In' : 'Sign Up'}
            </button>
            <button onClick={() => setModalType(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Navbar;
