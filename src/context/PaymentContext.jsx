// src/context/PaymentContext.js
import React, { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [paymentData, setPaymentData] = useState(null);

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
};
