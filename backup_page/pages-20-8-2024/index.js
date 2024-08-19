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
                          src="https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2FDefault_A_hyper_realistic_colorful_cosmic_colored_lotus_flower_0_374e78ba-6fce-4d7c-a4e3-e11fb6c36006_1.jpg?alt=media&token=3b77046f-e410-46bc-b305-1754bbd79e31"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/451110840_3830816397151466_6680009169378606729_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Z8SAoA_MYygQ7kNvgFiURXx&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD1G3nkgGFi48a0TGCmtWMHzSHHWKiSr4PPn05Ky3beoQ&oe=66BEB05A"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/451110840_3830816397151466_6680009169378606729_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Z8SAoA_MYygQ7kNvgFiURXx&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD1G3nkgGFi48a0TGCmtWMHzSHHWKiSr4PPn05Ky3beoQ&oe=66BEB05A"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={200} height={200}
                          src="https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://cdn.leonardo.ai/users/ba80e648-af07-4039-ab8a-580d0828618a/generations/8b87ce36-40d9-43cb-b595-172886a7d30c/Leonardo_Diffusion_Dirty_cyberpunk_lotus_load_wire_perfect_pr_0.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897"
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
