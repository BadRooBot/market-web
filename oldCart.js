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

  if (items.length === 0) return null

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
                    <div className="flow-root">
                      <ul role="list" className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700s">
                        {items.map((item) => (
                          <li key={item.product_id} className="flex py-6">
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
                              
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link href={item.imageurl}>{item.product_name}</Link>
                                  </h3>
                                  <p className="ml-4">${item.product_price.toFixed(2)}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button 
                                    onClick={() => handleUpdateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                    className="px-2 py-1 border rounded"
                                  >
                                    -
                                  </button>
                                  <span className="mx-2"> {item.quantity}</span>
                                  <button 
                                    onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                                    className="px-2 py-1 border rounded"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(item.product_id)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-between text-center text-sm text-gray-500">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={handleCloseCart}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                    <button
                      type="button"
                      className="font-medium text-red-600 hover:text-red-500"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
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