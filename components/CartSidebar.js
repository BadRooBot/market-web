'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { removeFromCart, updateQuantity, deleteAllItemCar, setCartOpen } from '@/slices/cartSlice'

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const { items, isOpen } = useSelector((state) => state.cart)
  const [mounted, setMounted] = useState(false)
  const myData = useSelector((state) => state.user);

  //console.log(items)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = items.reduce((total, item) => total + item.product_price * item.quantity, 0)

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleCloseCart = () => {
    dispatch(setCartOpen(false))
  }

  const handleClearCart = () => {
    dispatch(deleteAllItemCar())
  }

// if (items.length === 0){
//     return null
// }

  return (
    <Dialog open={isOpen} onClose={handleCloseCart} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Dialog.Panel className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700">
              
              <div className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-lg font-semibold">Shopping cart</Dialog.Title>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                        onClick={handleCloseCart}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    {  
                    subtotal >0?
                    <div className="flow-root">
                      <ul  className="flex-grow overflow-auto py-4">
                        {items?.map((item) => (
                          <li key={item.product_id} className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
                            <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                            <div className="absolute z-40 -ml-1 -mt-2  flex h-4 items-center">
                      
                      <button
                              type="button"
                              className="relative flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white bg-gray-500"
                              onClick={()=>handleRemoveItem(item.product_id)}
                                          >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                  </div>
                            <div className="flex flex-row">
                                <div className='relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                              <Image
                                src={item.imageurl}
                                alt={item.product_name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover object-center"
                              />

                              </div>
                              <a className='z-30 ml-2 flex flex-col space-x-4'>
                                <span className="text-lg font-bold">{item.product_name}</span>
                                <span className="text-lg ">{item.color}</span>
                              </a>
                            </div>
                            
                            <div className='flex h-16 flex-col justify-between'>
                                <p className="flex justify-end space-y-2 text-right text-sm">{item.product_price}<span className="ml-1 inline">EGP</span></p>
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                    <button  onClick={() => handleUpdateQuantity(item.product_id, Math.max(1, item.quantity - 1))} aria-label="Reduce item quantity" className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4 w-4 dark:text-neutral-500"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"></path></svg>
                                    </button>
                                    <p aria-live="polite" className="sr-only" role="status"></p>
                                    <p className="w-6 text-center">
                                        <span className="w-full text-sm">{item.quantity}
                                        </span>
                                    </p>
                                    <button onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)} aria-label="Increase item quantity" className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4 w-4 dark:text-neutral-500"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
                                    </button>
                                    <p aria-live="polite" className="sr-only" role="status"></p>
                                </div>
                            </div>

                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                        {/* <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                            <p>Taxes</p>
                            <p className="text-right text-base text-black dark:text-white">
                                $0.00
                                <span className="ml-1 inline">EGP</span>
                            </p>
                        </div> */}
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                            <p>Shipping</p>
                            <p className="text-right">When the order is received</p>
                        </div>
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                            <p>Total</p><p className="text-right text-base text-black dark:text-white">{subtotal.toFixed(2)}<span className="ml-1 inline">EGP</span></p></div></div>
                            <div className="mt-6">
                    <button onClick={()=>{
                      handleCloseCart();
                      
                      const _userID = myData?.currentUser?.jsonData?.user_id;
                      window.location.href = _userID?'/checkout/start':'/login';
                    }}
                    className='inline-flex justify-center rounded-md  border-2 border-indigo-500 bg-transparent px-4 py-2 text-sm font-medium  hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 '
                    >
                      Checkout
                    </button>
                  </div>
                    </div>
                    :<div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-16"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path></svg><p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p></div>                        }
                  </div>
                </div>

               
              </div>
                
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}