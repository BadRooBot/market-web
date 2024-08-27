import { Dialog, Transition } from '@headlessui/react';
import { useState, useEffect,Fragment } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import axios from 'axios';
import {API_URL} from'@/myenv'

export default function PaymentForm({ prevStep, updateFormData, submitForm, data }) {
  //console.log('data',data)
  const [selectedCard, setSelectedCard] = useState('mobile_wallet');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [badyText, setBadyText] = useState("Error try again");

  const cards = [
    { id: 'card', name: 'Card' },
    { id: 'mobile_wallet', name: 'Mobile Wallets' },
  ];


  const handleCardSelect = (id) => {
    setSelectedCard(id);
    //console.log('Selected card:', id);
  };

  const onPayClick=async()=>{
    setLoading(true);
    try {
      const response = await axios.post(API_URL+'/handle/payment/create-payment', {
        amount: data.amount*100, // Amount in cents
        currency: 'EGP',phone_number:data.phone,
        payment_method:selectedCard,email:data.email,name:data.name,addr:data.address,city:data.city
      });
      // Redirect to Paymob's payment page
      //console.log(response.data)
      if(response.status==204){
        setBadyText('Your payment information is incorrect, please review your information and try again.');
      setIsOpen(true);
      }else if (response.status==200){
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      // Handle error (e.g., show error message to user)
      setIsOpen(true);
      setBadyText('Error try again');
    } finally {
      setLoading(false);

    }

  }
  
  const OptionButton = ({ id, name, isSelected, onSelect, icon }) => (
    <button
      onClick={() => onSelect(id)}
      className={`min-w-[200px] items-center  justify-center p-4 border rounded-lg transition-colors ${
        isSelected ? 'border-blue-500  ' : 'border-black dark:border-gray-200 hover:bg-indigo-300'
      }`}
    >
      <h2 className="text-lg font-semibold  flex items-center">
          {id=='card' ? <CreditCard className="mr-2" />:   <Smartphone className="mr-2" />  } {id=='card' ?"Card":"Mobile Wallets"}
        </h2>
    </button>
  );
  return (
    <div className="space-y-8" >
      <div>
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card) => (
            <OptionButton
              key={card.id}
              {...card}
              isSelected={selectedCard === card.id}
              onSelect={handleCardSelect}
              icon={<img src={`/api/placeholder/48/48`} alt={card.name} className="w-12 h-12" />}
            />
          ))}
        </div>
      </div>
      <button className='inline-flex justify-center rounded-md border border-indigo-500 bg-indigo-300 dark:text-indigo-800 dark:bg-white px-4 py-2 text-sm font-medium  dark:hover:bg-black hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-5'  onClick={onPayClick} layout="responsive"  disabled={loading}>Pay Now</button>
      <button className='inline-flex justify-center rounded-md border border-indigo-500 bg-transparent px-4 py-2 text-sm font-medium  hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-5'   onClick={prevStep} layout="responsive" >Back</button>
      <div className='animate-bounce text-2xl  justify-center'   layout="responsive" >{loading?'🏐':''}</div>
      <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10"  onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900 text-black  dark:text-white p-6 text-left align-middle shadow-xl transition-all">
               
                <div className="mt-2">
                  <p>
                    {badyText}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                     className='inline-flex justify-center rounded-md border border-indigo-500 bg-transparent px-4 py-2 text-sm font-medium  hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-5'
                    onClick={()=>setIsOpen(false)}
                  >
                    close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </div>
  );
};