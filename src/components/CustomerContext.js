// CustomerContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const CustomerContext = createContext();

// Create the provider component
export const CustomerProvider = ({ children }) => {
  const [customerTelephone, setCustomerTelephone] = useState('');

  return (
    <CustomerContext.Provider value={{ customerTelephone, setCustomerTelephone }}>
      {children}
    </CustomerContext.Provider>
  );
};
