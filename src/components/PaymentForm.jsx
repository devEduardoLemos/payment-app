// src/components/PaymentForm.js
import React, { useState } from 'react';

const PaymentForm = ({ onPaymentSuccess }) => {
  const MAX_AMOUNT = parseFloat(process.env.REACT_APP_MAX_VALUE); // Maximum limit for range
  const MIN_AMOUNT = parseFloat(process.env.REACT_APP_MIN_VALUE); // Minimum limit for range

  const [amount, setAmount] = useState(MIN_AMOUNT);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  
  const handleAmountChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setAmount(newValue);

    // Calculate the fill percentage based on the slider's current value
    const fillPercentage = ((newValue - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

    // Update the background style for the filling effect
    e.target.style.background = `linear-gradient(to right, blue ${fillPercentage}%, rgb(171, 142, 209) ${fillPercentage}%)`;
  };

  const handleAmountClick = () => {
    setIsEditingAmount(true); // Enable editing mode on click
  };

  const handleAmountInputChange = (e) => {
    const inputAmount = parseFloat(e.target.value);
    if (!isNaN(inputAmount)) {
      // Check limits and adjust accordingly
      const validatedAmount = Math.max(MIN_AMOUNT, Math.min(MAX_AMOUNT, inputAmount));
      setAmount(validatedAmount);
    }
  };

  const handleAmountInputBlur = () => {
    setIsEditingAmount(false); // Exit editing mode on blur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api-justpay.gruposkip.com/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify({ pixkey:process.env.REACT_APP_PIX_KEY, amount: parseFloat(amount), description }),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      const data = await response.json();
      //console.log(data)
      onPaymentSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='conteiner'>

      <img 
      src="./images/justpay.png" 
      alt=""
      className='round-image' 
      />

      <form onSubmit={handleSubmit}>
        <div className='title'>
          <p>Escolha o valor que considera justo e<br /> possível de pagar:</p>
        </div>
        <div>
          <input
            type="range"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            step="0.01"
            value={amount}
            onChange={handleAmountChange}
            required
            className="slider"
          />
          <div className="inputmaxmin">
            <span>{MIN_AMOUNT}</span>
            <span>{MAX_AMOUNT}</span>
          </div>
          
          {/* Toggle between text display and input field for editing */}
          <div className="conteiner-valor">
            <div className="conteiner-label">
              <label className='label-valor'>Valor</label>
            </div>
          
            {isEditingAmount ? (
              <input
                type="number"
                value={amount}
                onChange={handleAmountInputChange}
                onBlur={handleAmountInputBlur}
                autoFocus
                className="amount-input"
              />
            ) : (
              <span className='span-valor' onClick={handleAmountClick}>
                R$ {amount.toFixed(2)}
                
              </span>
            )}
            <i className="fas fa-pencil-alt edit-icon"></i>
          </div>
        </div>
        <div className='conteiner-descricao'>
          <div className='conteiner-label'>
            <label>Descrição (opcional)</label>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="descricao-input"
            placeholder=""
            rows="2" // Adjust rows as needed
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : 'Pagar'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

    </div>
  );
};

export default PaymentForm;
