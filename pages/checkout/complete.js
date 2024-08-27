import React, { useEffect,useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import {API_URL,BEARER_TOKEN} from'@/myenv';
import bcrypt from 'bcryptjs';

const ProcessingPaymentPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [badyText, setBadyText] = useState("Please wait, we're processing your order...");
  const router = useRouter();

  useEffect(() => {
    // Check for payment status in URL parameters
    const { success, order,created_at } = router.query;
    if (success === 'true') {
        setBadyText("Please wait, we're processing your order...");
        saveOrderInServer(order,created_at);
    } else  {
        setBadyText('Payment failed, please try again later')
    }
  }, [router.query]);

  const dispatch = useDispatch();
  const order_db = useSelector(state => state.order);
  const myUserData = useSelector((state) => state.user);
const saveOrderInServer=async(getOrderId,createdAt)=>{
    var newList=await {...order_db.items,"order_id":getOrderId,"created_at":createdAt}  
    const get_order = await fetch(
      API_URL+'/handle/payment/get-order',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}` ,// Add this line
          'Content-Type': 'application/json'
        },body: JSON.stringify( {"orderId":getOrderId,"created_at":createdAt}),
      }
    );
    //console.log('get_order',get_order.body)
    if(get_order.status==500){
      setBadyText(`Your order is not available. Make sure to complete the payment process and try again. If you have already paid, send us this number ${getOrderId}. This is your order number. Send it to us on WhatsApp or Facebook. We will review your order as soon as possible. Thank you for using our site.`)

    }else if (get_order.status==200){
    
    const add_order = await fetch(
        API_URL+'/shefo/am/add-user-order',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}` ,// Add this line
            'Content-Type': 'application/json'
          },body: JSON.stringify(newList),
        }
      );
      if( add_order.status==500){
        setBadyText('There is a problem adding your order to the order list. Please contact customer service at abosh3rif@gmail.com. Your order number is '+getOrderId)
      }else if(add_order.status==200){
        var userNewOrder=myUserData.currentUser.jsonData.user_order;
        userNewOrder.push({"order_id":newList.order_id,"created_at":newList.created_at,"total":newList.total,"product_id":newList.product_id,
            "product_name":newList.product_name,"product_imageurl":newList.product_imageurl,"order_status":newList.order_status
        });
        const add_order_to_user_data = await fetch(
            API_URL+'/user/handle/add-order-to-user-data',
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}` ,// Add this line
                'Content-Type': 'application/json'
              },body: JSON.stringify({"user_order":userNewOrder,"userId":newList['user_id']}),
            }
          );    
          const jsonData=await add_order_to_user_data.json();
          
        if (newList['email_me']){
            const add_notification = await fetch(
                API_URL+'/user/handle/add-user-to-notification-emails',
                {
                  method: 'POST',
                  headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}` ,// Add this line
                    'Content-Type': 'application/json'
                  },body: JSON.stringify({"user_email":newList['user_email'],"userId":newList['user_id']}),
                }
              );
        }

      window.location.href = '/profile/success=true&user='+encodeURIComponent(JSON.stringify(jsonData));

        }
      }
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-neutral-900">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black  dark:text-white"
                  >
                    Processing Payment
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-black  dark:text-white">
                      {badyText}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="w-12 h-12 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
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

export default ProcessingPaymentPage;