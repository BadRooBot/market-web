// components/PaymentButton.js
import { useState } from 'react';
const PaymentButton = ({ amount, currency }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/handle/payment/create-payment`, 'POST', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { amount, currency },
      });
      const { paymentToken } = response.data;
      console.log('response.data =',response.data)
      
      // Redirect to Paymob payment page
      window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Pay Now'}
    </button>
  );
};

// export default PaymentButton;

// pages/checkout.js
// import PaymentButton from '../components/PaymentButton';

export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <PaymentButton amount={100} currency="EGP" />
    </div>
  );
}