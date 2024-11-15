import './styles/App.css';
import './styles/PaymentForm.css';
import './styles/PaymentResult.css';
import AppRouter from './router/AppRouter';
import { PaymentProvider } from './context/PaymentContext';

const App = () => {
  
  return (
    <PaymentProvider>
      <AppRouter />
    </PaymentProvider>
  );

};

export default App;
