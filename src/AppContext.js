import React, { createContext, useReducer } from "react";

// The initial state of this app's global context
const initialState = {
  ipV4: null,
  previousIpv4: null,
  ipLookUpError: null,
};

// Components will call this reducer to update the context
const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_IP":
      const {
        ipV4 = state.ipV4,
        previousIpv4 = state.previousIpv4,
        ipLookUpError = state.ipLookUpError,
      } = action.payload;
      return { ...state, ipV4, previousIpv4, ipLookUpError };
    default:
      console.warn("Action Type not implemented");
      return state;
  }
};

/**
 * Creating a Context to store state that is likely to be needed by many app components.
 *
 * @param {*} param0
 */
const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default AppContext;
