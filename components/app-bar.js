'use client';
import { usePathname } from 'next/navigation'
import { Disclosure, Menu,Transition } from '@headlessui/react'  
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { logout } from '@/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'users', href: '/users', current: false },
  { name: 'All Movies', href: '/all_movies', current: false },
  { name: 'login', href: '/login', current: false },
]


function setCurrent(){
switch(usePathname()){
  case '/':
    navigation[0].current=true;
  case '/users':
    navigation[1].current=true;
  case '/all_movies':
  navigation[2].current=true;
  case '/login':
    navigation[3].current=true;
          
}
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const myLogo='https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2FOIG-PhotoRoom.png-PhotoRoom.png?alt=media&token=4274e406-53ea-4ce9-8553-ced2826b6d1a';
const myLogo2='https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2F_930c2af4-3948-41c6-b609-9ff668b5edd1-PhotoRoom.png-PhotoRoom.png?alt=media&token=e1389367-bb1b-4209-8b55-2ccd9731725e';
export default function AppBar() {
  const dispatch = useDispatch();
  const userLogout=()=>{   
    dispatch(logout())
  }
  const myData = useSelector(state=>state.user);
  const isLoggedIn=  myData.IsLogin;
  if(isLoggedIn){
   // navigation.splice(3,1)
  }
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
                  <img
                    className="block h-12 w-12 rounded-full lg:hidden"
                    src={myLogo2}
                    alt="Black Lotus"
                  />
                  <img
                    className="hidden h-12 w-12 rounded-full lg:block"
                    src={myLogo}
                    alt="Black Lotus"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => ( 
                      <a
                     
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-6 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))
                    
                    }
                  </div>
                </div>
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
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2FDefault_A_hyper_realistic_colorful_cosmic_colored_lotus_flower_0_374e78ba-6fce-4d7c-a4e3-e11fb6c36006_1.jpg?alt=media&token=3b77046f-e410-46bc-b305-1754bbd79e31"
                        alt=""
                      />
                    </Menu.Button>  
                  </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item className={isLoggedIn?'visible':'hidden'}>
                        {({ active }) => (
                          <a
                            href="/profile/user=me"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                          onClick={
                            userLogout
                                            }
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                           
                            </a>
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
