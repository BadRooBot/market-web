import { useState ,useEffect} from 'react';
import InformationForm from './InformationForm';
import PaymentForm from './PaymentForm';
import { useSelector, useDispatch } from 'react-redux'
import { saveOrder,deleteAllOrder } from "@/slices/orderSlice";
import{APPNAME}from '@/myenv.js';
import { ChevronDown, ChevronUp, ShoppingCart, Search } from 'lucide-react';
export default function Start() {
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const { items, isOpen } = useSelector((state) => state.cart)

  
  const dispatch = useDispatch();

  const subtotal = items.reduce((total, item) => total + item.product_price * item.quantity, 0)
  const [formData, setFormData] = useState({
    information: { name: '', email: '',address: '', city: ''
      ,phone:'' ,email_me:true,country:'EGP',phone:'',state:'',amount:subtotal},
    payment: {  type: '' }
  });
  const myUserData = useSelector((state) => state.user);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  useEffect(() => {
    setIsClient(true);
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  const MobileLayout = () => (
    <div className="flex flex-col min-h-screen dark:text-white text-black">
      {/* Order Summary Header */}
      <div className=" p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center" onClick={() => setIsOrderSummaryVisible(!isOrderSummaryVisible)}>
          <div className="flex items-center">
            <ShoppingCart className="mr-2 dark:text-white text-black" />
            <span className='dark:text-white text-black'>{isOrderSummaryVisible ? "Hide" : "Show"} order summary</span>
            {isOrderSummaryVisible ? <ChevronUp className="ml-2 dark:text-white text-black" /> : <ChevronDown className="ml-2 dark:text-white text-black" />}
          </div>
          <span className="font-bold">{subtotal} EGP</span>
        </div>
      </div>

       {/* Collapsible Order Summary */}
       {isOrderSummaryVisible && (
        <div className="mt-2 p-4 border-t border-gray-800">
             <ul  className="flex-grow overflow-auto py-4">
                        {items.map((item) => (
                          <li key={item.product_id} className="flex w-full flex-col border-b border-neutral-400 dark:border-neutral-700">
          <div className="flex items-center mb-4">
            <div className="bg-gray-700 w-12 h-12 mr-4 relative " >
                <img src={item.imageurl} className='border  rounded-sm border-neutral-200' />
              <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.quantity}</span>
            </div>
            <div className="flex-grow">
              <p className="font-bold">{item.product_name}</p>
              <p className="text-sm ">{item.product_color}</p>
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
            {/* <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>60 </span>
            </div> */}
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>
                <span className="text-sm text-gray-500 mr-1">EGP</span>
                {subtotal+ '+ Delivery'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      <div className="p-4 " >
        <nav className="mb-6">
          <ul className="flex text-sm">
            <li  onClick={()=>{setStep(1)}} className={step==1?'mr-2  text-sm  text-opacity-100 font-bold':'mr-2  text-sm  text-opacity-80 '}>Information</li>
            <li className="mx-2">&gt;</li>
            <li  className={step==2?'mr-2  text-sm  text-opacity-100 font-bold':'mr-2  text-sm  text-opacity-80 '}>Payment</li>
          </ul>
        </nav>

        <UserData/>
      </div>
    </div>
  );

  const DesktopLayout = () => (
    <div className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900  dark:selection:bg-teal-600 dark:selection:text-white dark:text-white'>

    <div className="flex flex-row   min-h-screen ">
      {/* Left Column */}
      <div className="w-[60%]  pl-64  pr-8 pt-8 ">
        <div className="mb-6">
          <div className="text-2xl font-bold"><h2>🏐 {APPNAME}</h2></div>
        </div>
        
        <nav className="mb-6">
          <ul className="flex">
            <li onClick={()=>{setStep(1)}} className={step==1?'mr-2  dark:text-white text-sm  text-opacity-100 font-bold':' dark:text-white mr-2  text-sm  text-opacity-80 '}>Information</li>
            <li className="mx-2 text-sm">&gt;</li>
            <li  className={step==2?'mr-2 dark:text-white text-sm  text-opacity-100 font-bold':'mr-2 dark:text-white text-sm  text-opacity-80 '}>Payment</li>
          </ul>
        </nav>
        <UserData/>     
      </div>
      {/* Divider */}
      <div className="w-px bg-gray-700 mx-4"></div>
      {/* Right Column */}
      <div className="w-full md:w-[40%] p-6 ">

      <ul  className=" flex-grow overflow-auto py-4">
                        {items.map((item) => (
                          <li key={item.product_id} className=" flex w-full flex-col ">
        <div className="flex items-center mb-3">
          <div className="bg-gray-700 w-12 h-12 mr-4 relative">
          <img src={item.imageurl} className='border  rounded-sm border-neutral-200 w-12 h-12' />
            <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.quantity}</span>
          </div>
          <div>
            <p className="font-bold">{item.product_name}</p>
            <p className="text-sm text-gray-500">{item.color}</p>
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
          {/* <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>When the order is received
            </span>
          </div> */}
          <div className="flex justify-between font-bold ">
            <span>Total</span>
            <span>
              <span className="text-sm text-gray-500 mr-1">EGP</span>
              {subtotal+'+ Delivery'}
            </span>
          </div>
        </div>
      </div>
      
    </div>
    </div>

  );

  const UserData=()=>(
    <>
    {step === 1 && (
        <InformationForm
        nextStep={nextStep}
        updateFormData={(data) => updateFormData('information', data)}
        data={formData.information}
      />
      )}
      {step === 2 && (
        <PaymentForm
          prevStep={prevStep}
          updateFormData={(data) => updateFormData('payment', data)}
          submitForm={submitForm}
          data={formData.information}
        />
      )}
    </>
  )
  const updateFormData = (stepName, data) => {
    
    if(stepName==='information'){
      var _product_name=[];
      var _product_id=[];
      var _product_imageurl=[];
      var names=items.reduce((total, item) =>{
        _product_name.push( item.product_name);
        _product_id.push( item.product_id);
        _product_imageurl.push( item.imageurl);
      }, []);
      const userId=myUserData.currentUser.jsonData.user_id;
      const username=data.name;

      var orderData={
        product_name:_product_name,
        product_id:_product_id,product_imageurl:_product_imageurl,user_email:data.email,user_id:userId,user_name:username,user_address:data.address,
        user_phone:data.phone,user_city:data.city,user_state:data.state,email_me:data.email_me,order_status:'Under review',total:`${subtotal}`
      };
      dispatch(saveOrder(orderData));
    }
    setFormData(prevData => ({
      ...prevData,
      [stepName]: { ...prevData[stepName], ...data }
    }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };
    return    isMobile ? <MobileLayout /> : <DesktopLayout /> 

}

{/* 
    <div>

<h1>Multi-Step Form</h1>
      {step === 1 && (
        <InformationForm
          nextStep={nextStep}
          updateFormData={(data) => updateFormData('information', data)}
        />
      )}
      {step === 2 && (
        <ShippingForm
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={(data) => updateFormData('shipping', data)}
        />
      )}
      {step === 3 && (
        <PaymentForm
          prevStep={prevStep}
          updateFormData={(data) => updateFormData('payment', data)}
          submitForm={submitForm}
        />
      )}
    </div> */}