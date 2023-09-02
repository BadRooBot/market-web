'use client';
import { usePathname } from 'next/navigation'
import { Disclosure, Menu,Transition } from '@headlessui/react'  
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { logout } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll } from '@/slices/dbSlice';
import { useState } from 'react';
import SearchView from '@/components/search_View'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'users', href: '/users', current: false },
  { name: 'All Movies', href: '/all_movies', current: false },
  { name: 'Upload Video', href: '/fram_upload', current: false },
  { name: 'login', href: '/login', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const myLogo='https://firebasestorage.googleapis.com/v0/b/black-lotus-9a724.appspot.com/o/6.png?alt=media&token=8bbe9ed7-233e-4726-bc7a-02624e5c8228';
const myLogo2='https://firebasestorage.googleapis.com/v0/b/black-lotus-9a724.appspot.com/o/square-format%2C-transparent-background-designify.png?alt=media&token=0709d981-374a-4f0f-b455-c3393224469c';


export default function AppBar() {
  const dispatch = useDispatch();
  const userLogout=()=>{   
    dispatch(logout())
    dispatch(deleteAll())
  }
  const myData = useSelector(state=>state.user);
  const isLoggedIn=  myData.IsLogin;
  if(isLoggedIn){
   // navigation.splice(3,1)
  
  
  }
  
const [searchQuery, setSearchQuery] = useState('');
const router = useRouter();


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    width={100}
                    height={100}
                    className="block h-12 w-12 rounded-full lg:hidden"
                    src={myLogo2}
                    alt="Black Lotus"
                  />
                  <Image
                    width={100}
                    height={100}
                    className="hidden h-12 w-12 rounded-full lg:block"
                    src={myLogo}
                    alt="Black Lotus"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => ( 
                      <Link
                     
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-6 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))
                    
                    }
                  </div>
                </div>
              </div>
              <div className="relative flex items-center">
              <input
        type="search"
        value={searchQuery}
        onChange={(e) => 
          {
            setSearchQuery(e.target.value)
           
          
          }
          
        }
        onKeyDown={(e)=>{
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of the Enter key
            const inputValue = e.target.value;
            console.log(inputValue)
            //go to new page
            router.push(`/Search/${inputValue}`);

          }
      
        }}
        className=" border-indigo-800 peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleSearch2"
        placeholder="Type query" />
      <label
        htmlFor="exampleSearch2"
        className=" pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          {
           searchQuery==''? 'Search':''
          }
          </label>
    </div>

    <div className="snap-y absolute overflow-visible right-[8%] top-14 mb-0 max-w-[90%] origin-[0_0]  pt-[0.37rem]  bg-black">
    {/* <SearchView  style={{width:open?'26%':'40%'}}  /> */}
      </div>

   

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                              width={100}
                              height={100}

                        className="h-8 w-8 rounded-full"
                        src="https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2FDefault_A_hyper_realistic_colorful_cosmic_colored_lotus_flower_0_374e78ba-6fce-4d7c-a4e3-e11fb6c36006_1.jpg?alt=media&token=3b77046f-e410-46bc-b305-1754bbd79e31"
                        alt=""
                      />
                    </Menu.Button>  
                  </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item className={isLoggedIn?'visible':'hidden'}>
                        {({ active }) => (
                          <Link
                            href="/profile/user=me"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          onClick={
                            userLogout
                                            }
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                           
                            </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
          
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              
            </div>
          </Disclosure.Panel>
        

        </>
      )}
    </Disclosure>
  )
}
