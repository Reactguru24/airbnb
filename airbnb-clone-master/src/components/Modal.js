// src/components/Modal.js

import React from 'react';
import './Modal.css';

const Modal = ({ modalType, setModalType, handleSignIn, handleSignUp, handlePasswordRecovery, email, setEmail, password, setPassword }) => {
  return (
    <>
      {(modalType === 'signIn' || modalType === 'signUp') && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-icon" onClick={() => setModalType(null)}>×</span>
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
            {modalType === 'signIn' && (
              <>
                <button onClick={() => setModalType('forgotPassword')} className="forgot-password-button">
                  Forgot Password?
                </button>
                <p>or</p>
                <button onClick={() => setModalType('signUp')} className="signup-button">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {modalType === 'forgotPassword' && (
        <div className="modal-overlay" onClick={() => setModalType(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-icon" onClick={() => setModalType(null)}>×</span>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlePasswordRecovery}>
              Send Password Reset Email
            </button>
            <button onClick={() => setModalType('signIn')} className="signup-button">
              Sign In
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
