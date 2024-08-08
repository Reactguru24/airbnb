import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  currentPage: 'home',
  selectedListing: null,
  user: null, // Add user to the initial state
};

// Action types
const actionTypes = {
  SET_PAGE: 'SET_PAGE',
  SET_SELECTED_LISTING: 'SET_SELECTED_LISTING',
  SET_USER: 'SET_USER', // Add action type for setting user
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_SELECTED_LISTING:
      return { ...state, selectedListing: action.payload };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload }; // Handle user state
    default:
      return state;
  }
};

// Create context
const StateContext = createContext();

// StateProvider component
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    // Load state from localStorage
    const savedState = localStorage.getItem('appState');
    return savedState ? JSON.parse(savedState) : initial;
  });

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use state context
export const useStateValue = () => useContext(StateContext);
