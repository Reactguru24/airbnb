// src/context/StateProvider.js

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  currentPage: 'home',
  selectedListing: null,
};

// Actions
const actionTypes = {
  SET_PAGE: 'SET_PAGE',
  SET_SELECTED_LISTING: 'SET_SELECTED_LISTING',
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_SELECTED_LISTING:
      return { ...state, selectedListing: action.payload };
    default:
      return state;
  }
};

// Create context
const StateContext = createContext();

// State provider component
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    // Initialize state from localStorage
    const savedState = localStorage.getItem('appState');
    return savedState ? JSON.parse(savedState) : initial;
  });

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateValue = () => useContext(StateContext);
