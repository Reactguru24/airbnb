// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import './Navbar.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import Modal from './Modal'; // Import the reusable Modal component

const Navbar = () => {
  const { state, dispatch } = useStateValue();
  const [modalType, setModalType] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

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
        setNotificationType('success');
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setModalType(null);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setNotification('Error signing in: ' + error.message);
        setNotificationType('error');
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setNotification('Signed up successfully!');
        setNotificationType('success');
        dispatch({ type: 'SET_USER', payload: userCredential.user });
        setModalType(null);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setNotification('Error signing up: ' + error.message);
        setNotificationType('error');
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setNotification('Signed out successfully!');
        setNotificationType('success');
        dispatch({ type: 'SET_USER', payload: null });
      })
      .catch((error) => {
        setNotification('Error signing out: ' + error.message);
        setNotificationType('error');
      });
  };

  const handlePasswordRecovery = () => {
    if (!email) {
      setNotification('Please enter your email address.');
      setNotificationType('error');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setNotification('Password reset email sent!');
        setNotificationType('success');
        setModalType(null);
      })
      .catch((error) => {
        setNotification('Error sending reset email: ' + error.message);
        setNotificationType('error');
      });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
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

      <Modal
        modalType={modalType}
        setModalType={setModalType}
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handlePasswordRecovery={handlePasswordRecovery}
      />

      {notification && (
        <div className={`notification ${notificationType}`}>
          {notification}
        </div>
      )}
    </div>
  );
};

export default Navbar;
