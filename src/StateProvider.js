import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './reducer.js';

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer to it.
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>

        {children}

    </StateContext.Provider>
);

// Allow information to be available via state
export const useStateValue = () => useContext(StateContext);