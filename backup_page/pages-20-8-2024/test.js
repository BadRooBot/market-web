// pages/checkout.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {API_URL} from'@/myenv'

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for payment status in URL parameters
    const { success, order_id } = router.query;
    if (success === 'true') {
      setPaymentStatus('Success');
      // You might want to verify this server-side for security
    } else if (success === 'false') {
      setPaymentStatus('Failed');
    }
  }, [router.query]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL+'/handle/payment/create-payment', {
        amount: 100*100, // Amount in cents
        currency: 'EGP',phone_number:'01010101010',
        payment_method:'mobile_wallet'
        // Add other necessary details
      });
      
      // Redirect to Paymob's payment page
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error('Error creating payment:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {paymentStatus ? (
        <p>Payment {paymentStatus}</p>
      ) : (
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      )}
    </div>
  );
}