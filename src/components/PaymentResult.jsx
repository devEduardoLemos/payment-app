// src/components/PaymentResult.js
import React from 'react';

const PaymentResult = ({ paymentData }) => {
  if (!paymentData) return null;

  const { amount, description, pix, qrcode } = paymentData;

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p><strong>Amount:</strong> {amount}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Pix (Copia e Cola):</strong> {pix}</p>
      <div>
        <img src={`data:image/png;base64,${qrcode}`} alt="QR Code" />
      </div>
    </div>
  );
};

export default PaymentResult;
