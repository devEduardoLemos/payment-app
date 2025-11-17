// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import PaymentResult from '../components/PaymentResult';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentForm />} />
        <Route path="/cajuvalley" element={<PaymentForm />} />
        <Route path="/payment-result" element={<PaymentResult />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
