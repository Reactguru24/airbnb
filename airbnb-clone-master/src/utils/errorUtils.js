// src/utils/errorUtils.js

export const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/weak-password':
        return 'The password is too weak. Please choose a stronger password.';
      case 'auth/invalid-action-code':
        return 'The reset code is invalid or expired.';
      case 'auth/expired-action-code':
        return 'The reset code has expired.';
      default:
        return 'An unexpected error occurred.';
    }
  };
  