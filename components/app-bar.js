import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/userSlice';
import { deleteAll } from '../slices/dbSlice';
import { deleteAllItemCar, setCartOpen } from '@/slices/cartSlice';
import { useRouter } from 'next/router';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import{APPNAME}from '@/myenv.js';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Market', href: '/product', current: false },
  // { name: 'Info v2', href: '/info-test/2', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AppBar({onClickDark}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const myData = useSelector(state => state.user);
  const isLoggedIn = myData.IsLogin;
  const { items, isOpen } = useSelector((state) => state.cart);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  const userLogout = () => {
    if (isLoggedIn) {
      dispatch(logout());
      dispatch(deleteAll());
      dispatch(deleteAllItemCar());
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/product/${searchQuery}`);
  };

  if (!mounted) {
    return null;
  }
  
  const toggleTheme = () => {
    const oldThme=localStorage.getItem('theme');
    const newTheme = oldThme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onClickDark(newTheme)
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Disclosure as="nav" className="top-0 bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-teal-600 dark:selection:text-white ">
       
      {({ open }) => (
        <>
          <div className="relative flex items-center justify-between p-4 lg:px-6 ">
            <div className="block flex-none md:hidden">
              <Disclosure.Button className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white">
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex w-full items-center">
              <div className="flex w-full md:w-1/3">
                <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
                  <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block "><h2>{APPNAME}</h2></div>
                </Link>
                <ul className="hidden gap-6 text-sm md:flex md:items-center">
                  {/* <li><Link href="/all_movies" className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">Market</Link></li> */}
                  <li><Link href="/product" className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">Market</Link></li>
                  <li><Link  onClick={isLoggedIn ? userLogout : undefined} href="/login" className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300">{ isLoggedIn?'logout':'login'}</Link></li>
                </ul>
              </div>
              
              <div className="hidden justify-center md:flex md:w-1/3">
                <form onSubmit={handleSearch} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
                  <input 
                    type="text" 
                    placeholder="Search for products..." 
                    autoComplete="off" 
                    className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400" 
                    name="search" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                    </svg>
                  </div>
                </form>
              </div>
            
              <div className="flex justify-end md:w-1/3">
              <button
            onClick={toggleTheme}
            className="  text-white p-2 rounded-full shadow-lg text-xl"
          >
            {localStorage.getItem('theme') === 'light' ? '🌙 ' : ' 🌞 '}
          </button>
                <button onClick={() => dispatch(setCartOpen(!isOpen))} aria-label="Open cart">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4 transition-all ease-in-out hover:scale-110">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                    </svg>
                    
                    {items.length > 0 && <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white animate-bounce">{items.length}</div>}
                  </div>
                </button>
              </div>
              {/* Profile dropdown */}
              <Menu as="div" className=" relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                      src="https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2FDefault_A_hyper_realistic_colorful_cosmic_colored_lotus_flower_0_374e78ba-6fce-4d7c-a4e3-e11fb6c36006_1.jpg?alt=media&token=3b77046f-e410-46bc-b305-1754bbd79e31"
                      alt=""
                    />
                  </Menu.Button>  
                </div>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {isLoggedIn && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/profile/user=me" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={isLoggedIn ? '/' : '/login'}
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        onClick={isLoggedIn ? userLogout : undefined}
                      >
                        {isLoggedIn ? 'Sign out' : 'Login'}
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
             
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-neutral-300  dark:bg-neutral-900 ">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                     'dark:text-gray-300  text-black  hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="a"
                href={isLoggedIn ? '#' : '/login'}
                onClick={isLoggedIn ? userLogout : undefined}
                className="block rounded-md px-3 py-2 text-base font-medium dark:text-gray-300  text-black hover:bg-gray-700 hover:text-white"
              >
                {isLoggedIn ? 'Sign out' : 'Sign in'}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}