// src/components/PaymentResult.js
import React, { useEffect, useRef, useState } from 'react';

const PaymentResult = ({ paymentData }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const resultRef = useRef(null); //create a reference to paymentResult container

  useEffect(() => {
    if (paymentData && resultRef.current) {
      // Scroll smoothly to the result
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Adjust scroll position slightly after the initial scroll
      setTimeout(() => {
        window.scrollBy({ top: 250, left: 0, behavior: 'smooth' }); // Scroll 50px more down
      }, 500); // Small delay to ensure smooth experience
    }
  }, [paymentData]); // Trigger effect whenever paymentData changes

  if (!paymentData) return null;

  const { amount, description, pix, qrcode } = paymentData;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pix);
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 10000); // Clear message after 2 seconds
    } catch (err) {
      setCopySuccess('Falha ao copiar!');
    }
  };

  return (
    <div className="PaymentResult" ref={resultRef}>
      <h2>QRCODE Gerado!</h2>
      <p><strong>Valor:</strong>R$ {amount}</p>
      <p><strong>Descrição:</strong> {description}</p>
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
