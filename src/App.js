import './App.css';
import React, { useState } from 'react';
import PaymentForm from './components/PaymentForm';
import PaymentResult from './components/PaymentResult';

const App = () => {
  const [paymentData, setPaymentData] = useState(null);

  const handlePaymentSuccess = (data) => {
    setPaymentData(data);
  };

  return (
    <div className="App">
      <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
      {paymentData && (
        <div>
          <PaymentResult paymentData={paymentData} />
        </div>
      )}
    </div>
  );
};

export default App;
