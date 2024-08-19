import { useState, useEffect } from 'react';

export default function ShippingForm({ nextStep, prevStep, updateFormData, data }) {
  const [address, setAddress] = useState(data.address);
  const [city, setCity] = useState(data.city);

  useEffect(() => {
    setAddress(data.address);
    setCity(data.city);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ address, city });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shipping</h2>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <button type="button" onClick={prevStep}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
}