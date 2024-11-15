// src/components/PaymentResult.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../context/PaymentContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faMoneyBill, faQrcode, faReceipt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const PaymentResult = () => {
  const { paymentData } = usePayment();
  const [copySuccess, setCopySuccess] = useState('');
  const resultRef = useRef(null); //create a reference to paymentResult container
  const navigate = useNavigate(); // Hook for navigation

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

  // Function to navigate back to the PaymentForm page
  const handleNewPayment = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <img 
      src="./images/justpay.png" 
      alt=""
      className='round-image' 
      />

      <div className="PaymentResult" ref={resultRef}>
        <div className="qr-instructions-container">
          <div className="qrcode">
            <img src={`data:image/png;base64,${qrcode}`} alt="QR Code" />
          </div>

          <div className="instructions">
            <div className="instruction">
              <FontAwesomeIcon icon={faMobileAlt} className="icon" />
              <p>Abra o aplicativo do seu banco ou instituição financeira e entre na área Pix;</p>
            </div>
            <div className="instruction">
              <FontAwesomeIcon icon={faMoneyBill} className="icon" />
              <p>Escolha a opção Pagar com QR Code ou Pix Copia e Cola;</p>
            </div>
            <div className="instruction">
              <FontAwesomeIcon icon={faQrcode} className="icon" />
              <p>Escaneie o QR Code ao lado ou copie e cole o código Pix;</p>
            </div>
            <div className="instruction">
              <FontAwesomeIcon icon={faReceipt} className="icon" />
              <p>Confirme as informações e finalize o pagamento;</p>
            </div>
            <div className="instruction">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <p>Após o pagamento feche a janela e aguarde a confirmação de pagamento por e-mail.</p>
            </div>
          </div>
        </div>
        <div className="container-value-description">
          <div className="value-description">
            <div className="value">
              <label htmlFor="value">Valor: </label>
              <p name='value'><strong> R$ {amount}</strong></p>
            </div>
            <div className="description">
              <label htmlFor="description">Descrição:</label>
              <p name='description'>{description}</p>
            </div>
            
          </div>
        
          <div className="empty">
            {/* <p>jsut to balance</p> */}
          </div>
          
        </div>
        
        <div className="pixcopypaste">
          <label htmlFor="pixcode">Pix Copia e Cola</label>
          <p name= "pixcode" className='pixcode'>{pix}</p>
          <button onClick={handleCopy}>Copy Pix Code</button>
          {copySuccess && <p className="copy-message">{copySuccess}</p>}
        </div>

        {/* Button to start a new payment */}
        <button className="new-payment-button" onClick={handleNewPayment}>
          Novo Pagamento
        </button>
      </div>
    </div>
    
  );
};

export default PaymentResult;
