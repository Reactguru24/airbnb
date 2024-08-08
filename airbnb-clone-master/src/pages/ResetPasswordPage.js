import React, { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { auth } from '../firebase';
import { confirmPasswordReset } from 'firebase/auth';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const { state } = useStateValue();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const oobCode = new URLSearchParams(window.location.search).get('oobCode'); // Extract code from URL

  useEffect(() => {
    if (!oobCode) {
      setError('Invalid or missing reset code.');
    }
  }, [oobCode]);

  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    confirmPasswordReset(auth, oobCode, newPassword)
      .then(() => {
        setSuccess('Password has been reset successfully!');
        setTimeout(() => {
          window.location.href = '/'; // Redirect after success
        }, 2000);
      })
      .catch((error) => {
        setError('Error resetting password: ' + error.message);
      });
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordPage;
