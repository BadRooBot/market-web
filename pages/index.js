import Image from "next/image";
import Link from "next/link";
import{APPNAME}from '@/myenv.js';

// list<Map<String,Dynamic>> item_InCar;
// item_InCar=[{"name":"nnnn"}];

export default function Index() {
  return (
    <>
    <div className="relative overflow-hidden dark:bg-neutral-900">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-indigo-700  sm:text-6xl ">
            Welcome to {APPNAME}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
            At {APPNAME}, everything is handmade with love and precision. Here you will find the highest quality and reasonable prices.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                        width={2000} height={2000}
                          src="https://i.imgur.com/W0xnAR0.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://i.imgur.com/feeHtAU.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://i.imgur.com/O9q2F2K.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://i.imgur.com/FCIe4Gp.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={200} height={200}
                          src="https://i.imgur.com/sCeGoRK.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://i.imgur.com/2DkEbNh.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://i.imgur.com/fbtnOL9.jpeg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/product"
                className="animate-bounce inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
               Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
