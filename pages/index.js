import Image from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <>
    <div className="relative overflow-hidden"style={{backgroundColor:'#1e2129'}}>
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-indigo-700  sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the harsh elements of a world that doesn&apos;t care
              if you live or die.
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
                          src="https://th.bing.com/th/id/R.0814a16ed67101b7c772237871dce99a?rik=cXdM1n55tlZGWg&pid=ImgRaw&r=0"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://th.bing.com/th/id/OIP._r_F_z9WrQmACzDqRnHCGgHaHa?pid=ImgDet&w=512&h=512&rs=1"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/Leonardo_Diffusion_album_cover_epic_electronic_music_organic_a_0.jpg?alt=media&token=4b6d9364-773a-4fc3-98df-b56a58e7f7d0"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                         width={2000} height={2000}
                          src="https://firebasestorage.googleapis.com/v0/b/legend-badroobot.appspot.com/o/new%2Flotus.jpg?alt=media&token=dbdb7c1e-702d-47fc-b398-9ad8fd679afc"
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
                          src="https://cdn.leonardo.ai/users/ba80e648-af07-4039-ab8a-580d0828618a/generations/0b542a46-9f3e-451b-9c5a-0a6b03e3b50b/Leonardo_Signature_album_cover_epic_electronic_music_organic_a_3.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/login"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
               Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
