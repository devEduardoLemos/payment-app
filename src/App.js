// src/App.js
import './App.css';
import React, { useState } from 'react';
import PaymentForm from './components/PaymentFrom';
import PaymentResult from './components/PaymentResult';

const App = () => {
  const [paymentData, setPaymentData] = useState(null);

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
  };

  return (
    <div className="App">
      <h1>Payment App</h1>
      <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
      <PaymentResult paymentData={paymentData} />
    </div>
  );
};

export default App;

