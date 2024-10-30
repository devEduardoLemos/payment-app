// src/components/PaymentForm.js
import React, { useState } from 'react';

const PaymentForm = ({ onPaymentSuccess }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount), description }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      const data = await response.json();
      console.log(data)
      onPaymentSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Valor:</label>
        <input
          type="range"
          min="0"
          max="200"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
         <span> R$ {amount}</span> {/* Real-time display of the amount */}
      </div>
      <div>
        <label>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processando...' : 'Pagar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default PaymentForm;
