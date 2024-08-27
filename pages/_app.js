import React, { useState, useEffect } from 'react';
import store, { persistor } from '../app/store.js'
import AppBar from '../components/app-bar.js'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import CartSidebar from '@/components/CartSidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { APPNAME } from '@/myenv.js';
import Link from 'next/link.js';

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  const isCheckoutPage =router.pathname =='/checkout/start';
  const getPageTitle = () => {
    const path = router.pathname;
    const titles = {
      '/': {'name':'','bio':'Our home handmade crochet bags and macrame art'},
      '/checkout/start': {'name':'checkout','bio':'Our checkout handmade crochet bags and macrame art'},
      '/about': {'name':'About Us','bio':'Learn about our passion for handmade crochet bags and macrame art.'},
      '/terms-conditions': {'name':'Terms & Conditions','bio':'Terms and conditions for purchasing our handmade crochet bags and macrame art.'},
      '/privacy-policy':{'name':'Privacy Policy','bio':'Our privacy policy explaining how we collect, use, and protect your personal information.'},
      '/frequently-asked-questions': {'name':'FAQ','bio':'Frequently asked questions about our handmade crochet bags and macrame items.'},
      // Add more routes and their corresponding titles here
    };
    return titles[path] || APPNAME; // Default title if path is not found
  };
  useEffect(() => {
    // On component mount, check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = (newTheme) => {
    // const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={theme}>
          <Head>
            <title>{getPageTitle()['name']} - {APPNAME}</title>
            <meta name="description" content="Market our handmade crochet bags and macrame items." />
          </Head>
          {!isCheckoutPage && <AppBar  onClickDark={toggleTheme}/>}
          <CartSidebar />
         
          <Component {...pageProps} />
          {!isCheckoutPage && (
            <footer className="text-sm text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
                <div>
                  <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
                    <span className="uppercase animate-pulse">🏐 {APPNAME}</span>
                  </Link>
                </div>
                <nav>
                  <ul>
                    <li><Link className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/">Home</Link></li>
                    <li><Link className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/about">About</Link></li>
                    <li><Link className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/terms-conditions">Terms &amp; Conditions</Link></li>
                    <li><Link className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300" href="/frequently-asked-questions">FAQ</Link></li>
                  </ul>
                </nav>
                <div className="md:ml-auto">
           
            
            <div className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" >
              <Link className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" aria-label="Deploy " href="https://www.facebook.com/7anddesigner">
              <span className="px-3">⚡</span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              <span className="px-3">Facebook  </span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              </Link>
              <Link className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" aria-label="Deploy " href="#">
              <span className="px-3">⚡</span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              <span className="px-3">Whatsapp  </span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              </Link>
            </div>
            
            <div className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" >
              <Link className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" aria-label="Deploy " href="#">
              <span className="px-3">⚡</span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              <span className="px-3">instagram  </span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              </Link>
              <Link className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" aria-label="Deploy " href="#">
              <span className="px-3">⚡</span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              <span className="px-3">YouTube  </span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              </Link>
              
            </div>
            <Link className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white" aria-label="Deploy " href="https://www.facebook.com/profile.php?id=100078019702613">
              <span className="px-3">🛠</span>
              <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
              <span className="px-3">Developer  </span>
            </Link>
          </div>
              </div>
              <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
                  <p>© 2024-2025 Sherif Group. All rights reserved.</p>
                </div>
              </div>
            </footer>
          )}
        </div>
      </PersistGate>
    </Provider>
  )
}