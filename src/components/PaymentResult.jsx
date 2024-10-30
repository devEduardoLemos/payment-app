// src/components/PaymentResult.js
import React, { useState } from 'react';

const PaymentResult = ({ paymentData }) => {
  const [copySuccess, setCopySuccess] = useState('');

  if (!paymentData) return null;

  const { amount, description, pix, qrcode } = paymentData;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pix);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className="PaymentResult">
      <h2>Payment Successful!</h2>
      <p><strong>Amount:</strong> {amount}</p>
      <p><strong>Description:</strong> {description}</p>
      <p className='pixlabel'><strong>Pix copia e cola:</strong></p>
      <div className="pixcopypaste">
        <p>{pix}</p>
        <button onClick={handleCopy}>Copy Pix Code</button>
        {copySuccess && <p className="copy-message">{copySuccess}</p>}
      </div>
      <div>
        <img src={`data:image/png;base64,${qrcode}`} alt="QR Code" />
      </div>
    </div>
  );
};

export default PaymentResult;
