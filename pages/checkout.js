import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart, Search } from 'lucide-react';
import Link from 'next/link';

export default function Checkout() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('anakilla015@gmail.com');
  const [firstName, setFirstName] = useState('mahmoud');
  const [lastName, setLastName] = useState('sherif');
  const [address, setAddress] = useState('Ismailia, the great hill');
  const [apartment, setApartment] = useState('الدور الكبير');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('New York');
  const [zipCode, setZipCode] = useState('10003');
  const [country, setCountry] = useState('United States');
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (!isClient) return null;

//   const UserData=()=>(
//     <>
//     <h1 className="text-2xl font-bold mb-6">Contact</h1>

// <form>
//           <div className="mb-4">
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded bg-black text-white"
//               placeholder="Email or mobile phone number"
//             />
//           </div>
          
//           <div className="mb-6">
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" />
//               <span className="text-sm">Email me with news and offers</span>
//             </label>
//           </div>
          
//           <h2 className="text-xl font-bold mb-4">Shipping address</h2>
          
//           <div className="mb-4">
//             <select
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               className="w-full p-3 border rounded bg-black text-white appearance-none"
//             >
//               <option value="United States">United States</option>
//               {/* Add more countries here */}
//             </select>
//           </div>
          
//           <div className="mb-4">
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full p-3 border rounded bg-black text-white"
//               placeholder="First name (optional)"
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full p-3 border rounded bg-black text-white"
//               placeholder="Last Name"
//             />
//           </div>
//           {/* Add more form fields here */}

//         </form>
//     </>
//   )
  const MobileLayout = () => (
    <div className="flex flex-col bg-black text-white min-h-screen">
      {/* Order Summary Header */}
      <div className="bg-gray-900 p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center" onClick={() => setIsOrderSummaryVisible(!isOrderSummaryVisible)}>
          <div className="flex items-center">
            <ShoppingCart className="mr-2" />
            <span>{isOrderSummaryVisible ? "Hide" : "Show"} order summary</span>
            {isOrderSummaryVisible ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </div>
          <span className="font-bold">$14.90</span>
        </div>
      </div>

       {/* Collapsible Order Summary */}
       {isOrderSummaryVisible && (
        <div className="bg-gray-900 p-4 border-t border-gray-800">
          <div className="flex items-center mb-4">
            <div className="bg-gray-700 w-12 h-12 mr-4 relative">
              <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
            </div>
            <div className="flex-grow">
              <p className="font-bold">Acme Baby Onesie</p>
              <p className="text-sm text-gray-500">6M / Beige</p>
            </div>
            <div className="ml-auto">
              <p>$10.00</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$4.90</span>
            </div>
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>
                <span className="text-sm text-gray-500 mr-1">USD</span>
                $14.90
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      <div className="p-4">
        <nav className="mb-6">
          <ul className="flex text-sm">
            <li className="mr-2 ">
             <a className='text-blue-600'> 
              Information
               </a>
            </li>
            <li className="mx-2">&gt;</li>
            <li className="mx-2">Shipping</li>
            <li className="mx-2">&gt;</li>
            <li className="ml-2">Payment</li>
          </ul>
        </nav>

       
      </div>
    </div>
  );

  const DesktopLayout = () => (
    <div className="flex flex-row bg-black text-white min-h-screen">
      {/* Left Column */}
      <div className="w-2/3 p-6">
        <header className="mb-6">
          <div className="text-2xl font-bold">Azza</div>
        </header>
        
        <nav className="mb-6">
          <ul className="flex">
            <li className="mr-2">Information</li>
            <li className="mx-2">&gt;</li>
            <li className="mx-2">Shipping</li>
            <li className="mx-2">&gt;</li>
            <li className="ml-2">Payment</li>
          </ul>
        </nav>
        
      </div>
      
      {/* Divider */}
      <div className="w-px bg-gray-700 mx-4"></div>
      {/* Right Column */}
      <div className="w-1/3 p-6 bg-gray-900">
        {/* Order summary content */}
        {/* ... (same as before) */}
      </div>
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout /> ;
}