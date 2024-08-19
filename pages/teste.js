import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart, Search } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, deleteAllItemCar, setCartOpen } from '@/slices/cartSlice'

export default function Checkout() {
    const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state) => state.cart)
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [country, setCountry] = useState('United States');
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Information', 'Shipping', 'Payment'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <UserData/>;
      case 1:
        return <div>Shipping Content</div>;
      case 2:
        return <div>Payment Content</div>;
      default:
        return null;
    }
  };
  useEffect(() => {
    setIsClient(true);
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (!isClient) return null;
  const subtotal = items.reduce((total, item) => total + item.product_price * item.quantity, 0)

  const UserData=()=>(
    <div className='bg-black p-4'>
    <form>

       {currentStep===0&& <>
    <h1 className="text-2xl font-bold mb-6">Contact</h1>

            <div className="mb-4">
              <input
              required
                id="email"
                    name="email"
                    type="email"
                className="w-full p-2 border rounded bg-black text-white"
                placeholder="Email or mobile phone number"
              />
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input id="email_me"

                    name="email_me" type="checkbox" className="mr-2" />
                <span>Email me with news and offers</span>
              </label>
            </div>
            
            <h2 className="text-xl font-bold mb-4">Shipping address</h2>
            
            <div className="mb-4">
              <select
              required
              id="countries"
                    name="countries"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border rounded bg-black text-white"
              >
                <option value="United States">United States</option>
                <option value="EGP">EGP </option>
                {/* Add more countries here */}
              </select>
            </div>
            
            <div className="flex mb-4">
              <input
              required
                type="text"
                id="First_name"
                    name="First_name"
                className="w-1/2 mr-2 p-2 border rounded bg-black text-white"
                placeholder="First name (optional)"
              />
              <input
              required
                type="text"
                id="Last_name"
                    name="Last_name"
                className="w-1/2 ml-2 p-2 border rounded bg-black text-white"
                placeholder="Last name"
              />
            </div>
            
            <div className="mb-4 relative">
              <input
              required
                type="text"
                id="Address"
                    name="Address"
                className="w-full p-2 border rounded bg-black text-white"
                placeholder="Address"
              />
              {/* <Search className="absolute right-3 top-3 text-gray-400" /> */}
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400">Add a house number if you have one</p>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                required
                id="phone_number"
                    name="phone_number"
                className="w-full p-2 border rounded bg-black text-white"
                placeholder="phone number"
              />
            </div>
            
            <div className="flex mb-4">
              <input
                type="text"
                id="City"
                required
                    name="City"
                className="w-1/3 mr-2 p-2 border rounded bg-black text-white"
                placeholder="City"
              />
              <div className="w-1/3 mx-2 relative">
              <input
                type="text"
                id="states"
                    name="states"
                    required
                className="w-1/3 mr-2 p-2 border rounded bg-black text-white"
                placeholder="states"
              />
              </div>
              <input
              required
                type="text"
                 id="ZIP_code"
                    name="ZIP_code"
                className="w-1/3 ml-2 p-2 border rounded bg-black text-white"
                placeholder="ZIP code"
              />
            </div>
            </>
            }
            
            {currentStep<2&&<button onClick={()=>{if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }}} className="w-60  bg-indigo-500 text-white py-3 rounded">
              Next
            </button>}
            {currentStep==2&&<button type="submit" className="w-60  bg-indigo-500 text-white py-3 rounded">
              Continue to shipping
            </button>}
          </form>
    </div>
  )
  const MobileLayout = () => (
    <div className="flex flex-col  text-white min-h-screen">
      {/* Order Summary Header */}
      <div className=" p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center" onClick={() => setIsOrderSummaryVisible(!isOrderSummaryVisible)}>
          <div className="flex items-center">
            <ShoppingCart className="mr-2" />
            <span>{isOrderSummaryVisible ? "Hide" : "Show"} order summary</span>
            {isOrderSummaryVisible ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </div>
          <span className="font-bold">{subtotal} EGP</span>
        </div>
      </div>

       {/* Collapsible Order Summary */}
       {isOrderSummaryVisible && (
        <div className="mt-2 p-4 border-t border-gray-800">
             <ul  className="flex-grow overflow-auto py-4">
                        {items.map((item) => (
                          <li key={item.product_id} className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
          <div className="flex items-center mb-4">
            <div className="bg-gray-700 w-12 h-12 mr-4 relative " >
                <img src={item.imageurl} className='border  rounded-sm border-neutral-200' />
              <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{items.length}</span>
            </div>
            <div className="flex-grow">
              <p className="font-bold">{item.product_name}</p>
              <p className="text-sm text-gray-500">{item.product_color}</p>
            </div>
            <div className="ml-auto">
              <p>{item.product_price}</p>
            </div>
          </div>
          </li>
))}
</ul>
          <div className="border-b border-gray-800 pt-4 pb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>60 </span>
            </div>
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>
                <span className="text-sm text-gray-500 mr-1">EGP</span>
                {subtotal+60}
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

        {renderStepContent(currentStep)}
      </div>
    </div>
  );

  const DesktopLayout = () => (
    <div className="flex flex-row bg-black text-white min-h-screen ">
      {/* Left Column */}
      <div className="w-[60%]  pl-64  pr-8 pt-8 ">
        <header className="mb-6">
          <div className="text-2xl font-bold">Azza</div>
        </header>
        
        <nav className="mb-6">
          <ul className="flex">
            <li onClick={()=>{setCurrentStep(0)}} className={currentStep==0?'mr-2 text-white text-sm  text-opacity-100 font-bold':'mr-2 text-white text-sm  text-opacity-80 '}>Information</li>
            <li className="mx-2 text-sm">&gt;</li>
            <li onClick={()=>{setCurrentStep(1)}} className={currentStep==1?'mr-2 text-white text-sm  text-opacity-100 font-bold':'mr-2 text-white text-sm  text-opacity-80 '} >Shipping</li>
            <li className="mx-2 text-sm">&gt;</li>
            <li onClick={()=>{setCurrentStep(2)}} className={currentStep==2?'mr-2 text-white text-sm  text-opacity-100 font-bold':'mr-2 text-white text-sm  text-opacity-80 '}>Payment</li>
          </ul>
        </nav>
        <UserData/>     
      </div>
      {/* Divider */}
      <div className="w-px bg-gray-700 mx-4"></div>
      {/* Right Column */}
      <div className="w-full md:w-[40%] p-6 bg-black">

      <ul  className=" flex-grow overflow-auto py-4">
                        {items.map((item) => (
                          <li key={item.product_id} className=" flex w-full flex-col ">
        <div className="flex items-center mb-3">
          <div className="bg-gray-700 w-12 h-12 mr-4 relative">
          <img src={item.imageurl} className='border  rounded-sm border-neutral-200 w-12 h-12' />
            <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{items.length}</span>
          </div>
          <div>
            <p className="font-bold">{item.product_name}</p>
            <p className="text-sm text-gray-500">{item.product_color}</p>
          </div>
          <div className="ml-auto">
            <p>{item.product_price}</p>
          </div>
        </div>
        
        </li>

      ))}
      </ul>
        <div className="border-t border-gray-700 mt-4 ">
          <div className="flex justify-between mt-4 mb-2 ">
            <span>Subtotal</span>
            <span> {subtotal} EGP</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Calculated at next step
            </span>
          </div>
          <div className="flex justify-between font-bold ">
            <span>Total</span>
            <span>
              <span className="text-sm text-gray-500 mr-1">EGP</span>
              {subtotal}
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout /> ;
}