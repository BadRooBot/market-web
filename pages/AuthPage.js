import { useRouter } from 'next/router';
import { useEffect, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
import { API_URL } from '@/myenv';

const myLogo = 'https://i.imgur.com/Ogl7pv2.png'//'https://firebasestorage.googleapis.com/v0/b/black-lotus-9a724.appspot.com/o/6.png?alt=media&token=8bbe9ed7-233e-4726-bc7a-02624e5c8228';

export default function AuthPage({ isSignup = false }) {
  const [isError, setIsError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const captchaRef = useRef(null);

  const title = isSignup ? 'Failed to register' : 'Login failed';
  const text = isSignup
    ? 'Please double-check your password and email. If you are sure of the email, maybe the email is already registered. Try logging in.'
    : 'Please check your email and password. If you do not have an account yet, please create a new account first.';

  useEffect(() => {
    const { error } = router.query;
    setIsError(error === '500');

    // Load reCAPTCHA script
    const loadScriptAndRenderCaptcha = () => {
      if (window.grecaptcha) {
        renderCaptcha();
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = renderCaptcha;
        document.body.appendChild(script);
      }
    };

    const renderCaptcha = () => {
      if (window.grecaptcha && captchaRef.current) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.render(captchaRef.current, {
            sitekey: '6LcPtjUqAAAAAKRlur2wEIqqhQ_ZHSrlZqVxD2yY',
            callback: (token) => setCaptchaToken(token),
          });
        });
      }
    };

    loadScriptAndRenderCaptcha();

    return () => {
      // Reset captcha on unmount
      if (window.grecaptcha && captchaRef.current) {
        window.grecaptcha.reset(captchaRef.current);
      }
    };
  }, [router.query.error, isSignup]);

  const { protocol, hostname, port } = typeof window !== 'undefined' ? window.location : { protocol: '', hostname: '', port: '' };
  const currentUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }
    event.target.submit();
  };

  return (
    <>
      <Transition.Root show={isError} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => setIsError(false)}>
          {/* Dialog content */}
          <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="eas  e-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
  
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
  
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIserror(false)}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIserror(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-neutral-900">
        <div className='sm:mx-auto sm:w-full sm:max-w-sm p-3 dark:bg-black bg-neutral-300 shadow-lg shadow-neutral-700 rounded-lg'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              width={400}
              height={400}
              className="mx-auto h-40 w-auto"
              src={myLogo}
              alt="Lotus"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              {isSignup ? 'Sign Up New account' : 'Sign in to your account'}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form id="auth-form" className="space-y-6" action={`${API_URL}/user/handle/${isSignup ? 'signup' : 'login'}`} method="POST" onSubmit={handleSubmit}>
              <input hidden value={currentUrl} name='xyz' id='xyz' type='text'/>

              {isSignup && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-400">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">
                    Password
                  </label>
                  {!isSignup && (
                    <div className="text-sm">
                      <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div ref={captchaRef}></div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isSignup ? 'Sign Up' : 'Sign in'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              {isSignup ? 'Already a member?' : 'Not a member?'}{' '}
              <Link href={isSignup ? "/login" : "/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                {isSignup ? 'Login' : 'Start free Now !!'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}